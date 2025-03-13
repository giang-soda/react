'use client';

import { useEffect } from 'react';

interface IHeadUpdate {
  title: string;
}

export default function HeadUpdate(props: IHeadUpdate) {
  useEffect(() => {
    document.title = props.title;
  });

  return null;
}
