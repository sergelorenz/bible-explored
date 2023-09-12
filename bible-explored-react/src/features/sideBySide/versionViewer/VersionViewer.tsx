import React from 'react'
import { useDispatch } from 'react-redux';

type Props = {
  versionViewerKey: number,
  version: string,
  onCloseVersionViewerAction?: Function,
  onUpdateVersionViewerAction?: Function
}

function VersionViewer({versionViewerKey, version, onCloseVersionViewerAction, onUpdateVersionViewerAction}: Props) {
  const dispatch = useDispatch();

  return (
    <div className='version-viewer'>
      <div className='version-viewer-header'>

      </div>
    </div>
  )
}

export default VersionViewer