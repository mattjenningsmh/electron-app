import React, { useState, useEffect } from 'react';
import './VSCodeLayout.css';

const VSCodeLayout = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'index.js', type: 'file' },
    { id: 2, name: 'src', type: 'folder', expanded: true, children: [
      { id: 3, name: 'App.js', type: 'file' },
      { id: 4, name: 'components', type: 'folder', expanded: false, children: [
        { id: 5, name: 'Header.js', type: 'file' },
        { id: 6, name: 'Sidebar.js', type: 'file' }
      ]}
    ]},
    { id: 7, name: 'package.json', type: 'file' },
    { id: 8, name: 'README.md', type: 'file' }
  ]);

  const [tabs, setTabs] = useState([
    { id: 1, name: 'index.js', active: true },
    { id: 3, name: 'App.js', active: false }
  ]);

  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);

  // Handle tab click
  const handleTabClick = (tabId) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
  };

  // Handle tab close
  const handleTabClose = (e, tabId) => {
    e.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    // If we closed the active tab, activate the first remaining tab
    if (tabs.find(tab => tab.id === tabId).active && newTabs.length > 0) {
      newTabs[0].active = true;
    }
    
    setTabs(newTabs);
  };

  // File icon component
  const FileIcon = ({ type }) => {
    if (type === 'folder') {
      return (
        <svg className="file-icon" viewBox="0 0 24 24">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      );
    }
    return (
      <svg className="file-icon" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <path d="M13 2v7h7" />
      </svg>
    );
  };

  // Render file/folder tree recursively
  const renderTree = (items, level = 0) => {
    return items.map(item => (
      <div key={item.id}>
        <div 
          className="file-item"
          style={{ paddingLeft: `${(level * 12) + 8}px` }}
        >
          <FileIcon type={item.type} />
          <span>{item.name}</span>
        </div>
        {item.type === 'folder' && item.expanded && item.children && 
          renderTree(item.children, level + 1)
        }
      </div>
    ));
  };

  // Handle mouse down for resizing
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move for resizing
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = e.clientX;
      if (newWidth > 100 && newWidth < 400) {
        setSidebarWidth(newWidth);
      }
    }
  };

  // Handle mouse up for resizing
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for resize
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="vscode-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top bar */}
      <div className="top-bar">
        <div className="app-title">VSCode Layout Clone</div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        {/* Sidebar */}
        <div 
          className="sidebar"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="sidebar-header">
            Explorer
          </div>
          <div className="file-explorer">
            {renderTree(files)}
          </div>
        </div>
        
        {/* Resize handle */}
        <div 
          className="resize-handle"
          onMouseDown={handleMouseDown}
        />
        
        {/* Main content area */}
        <div className="editor-container">
          {/* Tabs */}
          <div className="tabs-container">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                className={`tab ${tab.active ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <FileIcon type="file" />
                <span>{tab.name}</span>
                <button 
                  className="close-button"
                  onClick={(e) => handleTabClose(e, tab.id)}
                >
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          {/* Editor area */}
          <div className="editor-area">
            {/* Empty editor area */}
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="status-bar">
        <span className="status-item">Ready</span>
        <span className="status-item">JavaScript</span>
        <div className="status-spacer"></div>
        <span className="status-item">Ln 1, Col 1</span>
      </div>
    </div>
  );
};

export default VSCodeLayout;