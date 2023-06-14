import * as monaco from 'monaco-editor';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { useRef } from 'react';

import { useMount } from '@/common/hook';

import styles from './index.module.css';

export type IJsonEditorProps = {
  initialValue: string;
  onChange?: (value: string) => void;
  onSave?: () => void;
};
self.MonacoEnvironment = {
  getWorker: () => new JsonWorker(),
  createTrustedTypesPolicy: null,
};

export const JsonEditor = (props: IJsonEditorProps) => {
  const { initialValue, onChange, onSave } = props;
  const editorRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (!editorRef.current) {
      return;
    }
    const editor = monaco.editor.create(editorRef.current, {
      value: initialValue,
      language: 'json',
      automaticLayout: true,
    });
    const model = editor.getModel();
    model.onDidChangeContent(() => {
      onChange?.(model.getValue());
    });
    monaco.editor.setModelLanguage(model, 'json');

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      onSave?.();
    });

    return () => {
      editor.dispose();
    };
  });

  return <div ref={editorRef} className={styles.editor} />;
};
