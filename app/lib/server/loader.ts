import fs from 'fs';
import path from 'path';
import merge from 'lodash/merge';
import config from '../../config';

const shortContent = (content: string, length: number = 200) => {
  // Process content: remove HTML tags and limit to 200 characters
  let cleanContent = content || '';
        
  // Remove HTML tags
  cleanContent = cleanContent.replace(/<[^>]*>/g, '');
  
  // Remove special characters and extra spaces
  cleanContent = cleanContent.replace(/\s+/g, ' ').trim();
  
  // Limit to 200 characters
  if (cleanContent.length > length) {
    cleanContent = cleanContent.substring(0, length);
  }

  return cleanContent;
}

/**
 * Load data from info folder and merge with additional data
 * file: /data/{folderName}/info/vi.json
 * @param folderName - The folder name in data directory
 * @param mergeData - Additional data to merge with the JSON content
 * @returns merged data objects
 */
function loadMetaDataFile(folderName: string, mergeData: Record<string, Record<string, string>> = {}): Record<string, Record<string, string>> {
  const infoFile = path.join(process.cwd(), 'data', folderName, 'info', 'vi.json');

  try {
    // Check if info directory exists
    if (!fs.existsSync(infoFile)) {
      console.warn(`Info directory not found: ${infoFile}`);
      return {};
    }

    const jsonContent = fs.readFileSync(infoFile, 'utf-8');
    const fileData = JSON.parse(jsonContent);
        
    // Deep merge with additional data
    return merge(fileData, mergeData);
  } catch (error) {
    console.error('Error loading info data:', error);
    return {};
  }
}

/**
 * Load all folders in the /data/{folderName}/list directory
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
        postData.content = shortContent(postData.content);
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
 * Load data from info folder and merge with base data
 * file: /data/{folderName}/info/vi.json
 * @param folderName - The folder name in data directory
 * @param mergeData - Additional data to merge with the JSON content
 * @returns Array of merged data objects
 */
export function loadMetaData(folderName: string | null, mergeData: Record<string, Record<string, string>> = {}): Record<string, string>[] {
  const baseData = loadMetaDataFile('_base', {
    'og:url': {
      content: config.VITE_HOST,
    },
    'canonical': {
      href: config.VITE_HOST,
    },
  });

  let itemData: Record<string, Record<string, string>> = {};

  if (folderName) {
    itemData = loadMetaDataFile(folderName);
  }

  return Object.values(merge(baseData, itemData, mergeData));
}

/**
 * Load all folders in the /data/{folderName}/list/number-{slug}/vi.json
 * @returns Array of post data sorted in descending order by folder name
 */
export function loadDataDetail<T>(folderName = 'posts', slug: string): T | null {
  const postsDir = path.join(process.cwd(), 'data', folderName, 'list');

  try {
    const folderDetail = fs.readdirSync(postsDir, { withFileTypes: true })
      .find((dirent) => {
        return dirent.name.replace(/^\d+-/, '') === slug;
      });

    if (!folderDetail) {
      console.error(`Folder with slug "${slug}" not found`);
      return null;
    }

    const viJsonPath = path.join(postsDir, folderDetail.name, 'vi.json');
    const jsonContent = fs.readFileSync(viJsonPath, 'utf-8');
    const postData = JSON.parse(jsonContent);
    postData.shortContent = shortContent(postData.content, 100);

    return postData;
  } catch (error) {
    console.error('Error loading folder detail:', error);
    return null;
  }
}

/**
 * Load all folders in the /data/{folderName}/list directory with name file
 * @returns Array of post data sorted in descending order by folder name
 */
export function loadDataListLink(folderName = 'posts'): string[] {
  const postsDir = path.join(process.cwd(), 'data', folderName, 'list');

  try {
    // Read all folders in the directory
    return fs.readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => b.localeCompare(a))
      .map(folderName => folderName.replace(/^\d+-/, ''));
    
  } catch (error) {
    console.error('Error loading folder list:', error);
    return [];
  }
}
