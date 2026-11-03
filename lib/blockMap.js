import { createContext, useContext } from 'react'
import { getBlockValue } from 'notion-utils'

const BlockMapContext = createContext({})
export function BlockMapProvider ({ blockMap, children }) {
  const collectionId = Object.keys(blockMap.collection)[0]
  const pageId =
    Object.values(blockMap.block)
      .map(getBlockValue)
      .find(block => block?.type === 'page' && block?.parent_id === collectionId)
      ?.id

  const blockMapAltered = {
    ...blockMap,
    pageId,
  }

  return (
    <BlockMapContext.Provider value={blockMapAltered}>
      {children}
    </BlockMapContext.Provider>
  )
}

export default function useBlockMap () {
  return useContext(BlockMapContext)
}
