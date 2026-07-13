import { color, delay, Listr } from 'listr2'

const ESC = String.fromCharCode(27)
const BEL = String.fromCharCode(7)

// OSC-8 terminal hyperlink: ESC ] 8 ; ; <url> BEL <text> ESC ] 8 ; ; BEL
function link(url: string, text: string): string {
  return `${ESC}]8;;${url}${BEL}${text}${ESC}]8;;${BEL}`
}

try {
  await new Listr(
    [
      {
        title: 'Emitting a terminal hyperlink through the task output.',
        task: async(_, task): Promise<void> => {
          task.output = `read the documentation at ${link('https://listr2.kilic.dev', 'listr2.kilic.dev')}`
          await delay(1000)
        },
        rendererOptions: { persistentOutput: true }
      },
      {
        title: 'Emitting a hyperlink with colored link text.',
        task: async(_, task): Promise<void> => {
          task.output = `this behavior fixes ${link('https://github.com/listr2/listr2/issues/768', color.blueBright('issue #768'))}`
          await delay(1000)
        },
        rendererOptions: { persistentOutput: true }
      },
      {
        title: 'Emitting colored and styled output.',
        task: async(_, task): Promise<void> => {
          task.output = `${color.greenBright('colors')}, ${color.yellowBright('styles')} and ${color.underline('other formatting')} are preserved as well`
          await delay(1000)
        },
        rendererOptions: { persistentOutput: true }
      }
    ],
    { renderer: 'default' }
  ).run()
} catch(e: any) {
  console.error(e)
}
