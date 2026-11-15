# Screenshots

The images in this folder, and `examples/renderer-default.gif`, are taken from a real terminal, and the documentation shows them. Every image comes from one case of [`renderer-cases.example.ts`](../renderer-cases.example.ts), named after the image, or from [`renderer-default.example.ts`](../renderer-default.example.ts). They are stored through Git LFS, so run `git lfs install` before you commit new ones.

## Terminal

- [foot](https://codeberg.org/dnkl/foot) on a headless [sway](https://swaywm.org/), 100 columns wide, with as many rows as the final output needs plus one.
- DejaVu Sans Mono at size 11, a scale of 2 for the PNG files and 1 for the GIF files, and the One Dark colors below.
- tmux inside foot with its status line off, a shell with `PS1='$ '`, and a clean environment: no `NO_COLOR`, no `TERM=dumb`, no `CI`.
- The cursor is hidden once the run ends, and the image is cropped to the window.

```ini
# foot.ini
font=DejaVu Sans Mono:size=11
pad=16x16

[cursor]
blink=no

[colors]
background=1e2127
foreground=abb2bf
regular0=1e2127
regular1=e06c75
regular2=98c379
regular3=e5c07b
regular4=61afef
regular5=c678dd
regular6=56b6c2
regular7=abb2bf
bright0=5c6370
bright1=e06c75
bright2=98c379
bright3=e5c07b
bright4=61afef
bright5=c678dd
bright6=56b6c2
bright7=ffffff
```

```bash
# start sway without a display, and foot with tmux inside it
WLR_BACKENDS=headless WLR_LIBINPUT_NO_DEVICES=1 WLR_RENDERER=pixman sway &
foot -c foot.ini --app-id listr2-shot --window-size-chars=100x8 tmux new-session -s s
```

## Taking a Screenshot

Run a case in the pane, from the root of the repository:

```bash
tmux send-keys -t s "clear; pnpm run --filter @listr2/examples start examples/renderer-cases.example.ts bracket; printf '\e[?25l'; read" Enter
```

Grab the window with `grim` while the run is in the state the image shows, such as a spinner on the third subtask for `bracket-running.png`, or once it ended for `bracket.png`:

```bash
grim -g "$(swaymsg -t get_tree | jq -r '.. | objects | select(.app_id? == "listr2-shot") | .rect | "\(.x),\(.y) \(.width)x\(.height)"')" bracket.png
```

The files ending in `-running.png` show a case while it runs, and `summary.png`, `show-subtasks.png`, `retry.png` and `output-bar.png` are taken while it runs as well. Every other PNG file shows the end of the run.

## Recording a GIF

Grab the window with `grim -s 1` in a loop for as long as the case runs, keeping the time of each frame. Then drop the frames that repeat the one before, keep each frame on screen for as long as it was, hold the last one for 3 seconds, and encode it with a palette of 64 colors:

```bash
ffmpeg -f concat -safe 0 -i frames.txt -vf "split[a][b];[a]palettegen=max_colors=64:stats_mode=full[p];[b][p]paletteuse=dither=none" -vsync vfr bracket.gif
```

`frames.txt` lists each kept frame with `file` and `duration` lines. `renderer-default.gif` is recorded the same way from `renderer-default.example.ts`, answering its prompt with Enter.

## Before v12

The `before-*.png` files show the same cases with `listr2@11.4.1`. Copy `renderer-cases.example.ts` as `cases.mts` into an empty folder, install `listr2@11.4.1` there, and run it with `tsx cases.mts <case>`.
