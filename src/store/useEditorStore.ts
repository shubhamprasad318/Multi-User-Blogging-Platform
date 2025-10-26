import { create } from 'zustand';

interface EditorState {
  isEditing: boolean;
  currentPostId: number | null;
  setEditing: (editing: boolean, postId?: number) => void;
  clearEditor: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isEditing: false,
  currentPostId: null,
  setEditing: (editing, postId) => set({ isEditing: editing, currentPostId: postId ?? null }),
  clearEditor: () => set({ isEditing: false, currentPostId: null }),
}));
