import fs from 'fs';
import path from 'path';
import merge from 'lodash/merge';

/**
 * Load all folders in the posts/list directory
 * @returns Array of post data sorted in descending order by folder name
 */
export function loadDataList<T>(folderName = 'posts'): T[] {
  const postsDir = path.join(process.cwd(), 'data', folderName, 'list');

  try {
    // Read all folders in the directory
    const folders = fs.readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => b.localeCompare(a)); // Sort in descending order

    const posts: T[] = [];

    for (const folderName of folders) {
      const viJsonPath = path.join(postsDir, folderName, 'vi.json');
      
      // Check if vi.json file exists
      if (!fs.existsSync(viJsonPath)) {
        continue;
      }

      try {
        // Read and parse JSON file
        const jsonContent = fs.readFileSync(viJsonPath, 'utf-8');
        const postData = JSON.parse(jsonContent);
        
        // Create slug from folder name (remove numbers and dashes at the beginning)
        const slug = folderName.replace(/^\d+-/, '');
        
        // Process content: remove HTML tags and limit to 200 characters
        let cleanContent = postData.content || '';
        
        // Remove HTML tags
        cleanContent = cleanContent.replace(/<[^>]*>/g, '');
        
        // Remove special characters and extra spaces
        cleanContent = cleanContent.replace(/\s+/g, ' ').trim();
        
        // Limit to 200 characters
        if (cleanContent.length > 200) {
          cleanContent = cleanContent.substring(0, 200);
        }

        postData.content = cleanContent;
        postData.slug = slug;
        
        posts.push(postData);
        
      } catch (error) {
        console.error(`Error reading JSON file in folder ${folderName}:`, error);
      }
    }

    return posts;
    
  } catch (error) {
    console.error('Error loading folder list:', error);
    return [];
  }
}

/**
 * Load data from info folder and merge with additional data
 * @param folderName - The folder name in data directory
 * @param mergeData - Additional data to merge with the JSON content
 * @returns Array of merged data objects
 */
export function loadDataInfo(folderName: string, mergeData: Record<string, Record<string, string>> = {}): Record<string, string>[] {
  const infoFile = path.join(process.cwd(), 'data', folderName, 'info', 'vi.json');

  try {
    // Check if info directory exists
    if (!fs.existsSync(infoFile)) {
      console.warn(`Info directory not found: ${infoFile}`);
      return [];
    }

    const jsonContent = fs.readFileSync(infoFile, 'utf-8');
    const fileData = JSON.parse(jsonContent);
        
    // Deep merge with additional data
    return Object.values(merge(fileData, mergeData));
  } catch (error) {
    console.error('Error loading info data:', error);
    return [];
  }
}
