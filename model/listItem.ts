interface ListItem {
  item: { id: number; name: string };
  onRemove: (itemId: number) => void;
}
