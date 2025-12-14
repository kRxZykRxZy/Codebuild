'use client'
import React, { useEffect, useRef } from 'react'

export default function EditorPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // load Blockly from global (script included in head via CDN)
    const load = async () => {
      // @ts-ignore
      const Blockly = (await import('blockly')).default || (window as any).Blockly
      if (!Blockly) return

      const workspace = Blockly.inject(blocklyDivRef.current!, {
        toolbox: `<xml><block type="controls_if"></block><block type="math_number"></block><block type="text"></block></xml>`,
        trashcan: true,
        scrollbars: true,
      })

      // basic save/load example
      (window as any).saveWorkspace = () => {
        const xml = Blockly.Xml.workspaceToDom(workspace)
        return Blockly.Xml.domToText(xml)
      }

      (window as any).loadWorkspace = (text: string) => {
        try {
          const xml = Blockly.Xml.textToDom(text)
          Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace)
        } catch (e) { console.error(e) }
      }
    }
    load()
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <div className="p-3 bg-white shadow">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Project Editor</h2>
          <div>
            <button id="saveBtn" className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <aside className="w-80 bg-white p-4 border-r">Sprites / Assets</aside>
        <div className="flex-1 p-4">
          <div ref={blocklyDivRef} id="blocklyDiv" style={{ height: '600px', width: '100%' }} />
        </div>
        <aside className="w-80 bg-white p-4 border-l">Stage</aside>
      </div>
    </div>
  )
}
