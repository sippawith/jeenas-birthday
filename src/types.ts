export interface Placeholder {
  label: string;
  filename: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  placeholders: Placeholder[];
}

export interface SlideData {
  type: 'intro' | 'category' | 'game' | 'outro';
  category?: Category;
}
