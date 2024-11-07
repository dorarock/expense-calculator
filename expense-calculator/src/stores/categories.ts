export enum Category {
  Food = "Food",
  Transport = "Transport",
  Entertainment = "Entertainment",
  Health = "Health",
}

export const categoryDetails: Record<Category, { label: string; color: string }> = {
  [Category.Food]: { label: "Food", color: "#5C80BC" },
  [Category.Transport]: { label: "Transport", color: "#C08497" },
  [Category.Entertainment]: { label: "Entertainment", color: "#A3BE8C" },
  [Category.Health]: { label: "Health", color: "#D08770" },
};
