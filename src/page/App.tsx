import { ReactFlow, Node,Controls, Background, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { fs } from '@tauri-apps/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect, useState } from 'react';

async function listPlaywrightFiles(setNodes) {
  try {
    // 문서 폴더 경로 가져오기
    const documentsDir = import.meta.env.VITE_PLAYWRIGHT_PATH;

    console.log("Documents folder path:", documentsDir);

    // 하위 폴더 읽기
    const items = await fs.readDir(documentsDir, { recursive: false });

    // 읽은 폴더/파일 목록 노드로 변환
    const playwrightFiles: Node[] = items.map(item => ({
      id: item.name || '',
      data: { label: item.name || '' },
      position: { x: 0, y: 0 } // 적절한 위치로 설정
    }));

    // 새로운 노드를 기존 노드와 병합
    setNodes((nodes) => [...nodes, ...playwrightFiles]);
  } catch (error) {
    console.error('Error reading Documents folder:', error);
  }
}

// 새로운 파일을 생성하고 노드를 추가하는 함수
async function createFileAndAddNode(fileName: string, setNodes: React.Dispatch<React.SetStateAction<Node[]>>) {
  // 파일 이름이 없으면 함수 종료
  if (!fileName) {
    console.error('File name is empty');
    return;
  }

  try {
    // 문서 폴더 경로 지정
    const documentsDir = import.meta.env.VITE_PLAYWRIGHT_PATH;
    const filePath = `${documentsDir}/${fileName}.ts`;

    // 새로운 파일 생성
    await fs.writeFile({ path: filePath, contents: '' }); // 빈 파일 생성

    console.log(`File created: ${filePath}`);

    // 새로운 노드 생성
    const newNode: Node = {
      id: fileName,
      data: { label: fileName },
      position: { x: Math.random() * 400, y: Math.random() * 400 } // 임의의 위치 설정
    };

    // 새로운 노드를 추가
    setNodes((nodes) => [...nodes, newNode]);

    console.log(`Node added for file: ${fileName}`);
  } catch (error) {
    console.error('Error creating file and adding node:', error);
  }
}

function Flow() {
  // 노드 상태 및 상태를 업데이트하는 함수
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    listPlaywrightFiles(setNodes);
  }, []);

  return (
    <>
      <InputText value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
      <Button onClick={() => createFileAndAddNode(inputValue, setNodes)}>Add Playwright Node</Button >
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow nodes={nodes} onNodesChange={onNodesChange}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;
