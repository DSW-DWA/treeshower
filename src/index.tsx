import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DeleteLogo from './delete.svg';
import EditLogo from './edit.svg';
import OkLogo from './ok.svg';
import AddLogo from './add.svg';
import ResetLogo from './reset.svg';
import data from './data.json';
import { useState } from 'react';
import { TreeNode } from './tree';
import buildTree from "./tree";

let root = buildTree(data);

interface ShowNodeProps {
  root: TreeNode;
}

function ShowNode(props: ShowNodeProps) {
  const [name, setName] = useState(props.root.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleConfirmEditClick = () => {
    props.root.name = name;
    setIsEditing(!isEditing);
  }

  const handleDeleteClick = () => {
    props.root.parent?.children.splice(props.root.parent.children.indexOf(props.root), 1)
    render()
  };

  const handleAddClick = () => {
     let node = new TreeNode('New Node');
     node.parent = props.root
     props.root.children.push(node);
     render()
  }

  const handleResetClick = () => {
    root = buildTree(data);
    render()
  }

  return(
    <div className='Node'>
      {isEditing ? 
        <div>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <button className='Btn' onClick={handleConfirmEditClick}>
              <img src={OkLogo} className='Logo' alt='Сохранить элемент'/>
            </button>
        </div>:
        <div className='Name'>
          {name}
          { props.root.parent ?
            <button className='Btn' onClick={handleDeleteClick}>
              <img src={DeleteLogo} className='Logo' alt='Удалить элемент'/>
            </button>:
            <button className='Btn' onClick={handleResetClick}>
              <img src={ResetLogo} className='Logo' alt='Вернуть в изначальное состояние'/>
            </button>
          }
          <button className='Btn' onClick={() => setIsEditing(!isEditing)}>
            <img src={EditLogo} className='Logo' alt='Редактировать элемент'/>
          </button>
          <button className='Btn' onClick={handleAddClick}>
            <img src={AddLogo} className='Logo' alt='Добавить новый элемент'/>
          </button>
        </div>
        }
       {props.root.children.map((child) => (
          <ShowNode root={child}></ShowNode>
        ))}
    </div>
  );
}

function App() {

  if (root !== null) {
    return (
      <div className='Node'>
        <ShowNode root={root}></ShowNode>
      </div>
    );
  } else {
    return (
      <div>
        Не получилось считать данные или сериализовать JSON
      </div>
    )
  }
  
}

function render() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

render();
reportWebVitals(console.log);
