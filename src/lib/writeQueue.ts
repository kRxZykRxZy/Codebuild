// Simple in-process write queue to serialize heavy writes to SQLite
import { prisma } from './prisma'

type Task = () => Promise<any>

class WriteQueue {
  private queue: Task[] = []
  private running = false

  enqueue(task: Task) {
    this.queue.push(task)
    this.run()
  }

  private async run() {
    if (this.running) return
    this.running = true
    while (this.queue.length) {
      const t = this.queue.shift()!
      try {
        await t()
      } catch (e) {
        console.error('Write task failed', e)
      }
    }
    this.running = false
  }
}

export const writeQueue = new WriteQueue()
