export interface Link {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  ipAddress?: string;
  createdAt: string;
}

export interface LinkDTO {
  title: string;
  description: string;
  url: string;
  category: string;
}
