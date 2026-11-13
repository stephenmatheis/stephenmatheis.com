---
title: Timing functions apply between each pair of keyframes
type: technique
topic: css
added: 2026-11-09
tags: [css, animation]
---

`animation-timing-function` doesn't run across the whole animation. It runs again for every gap between two keyframes.

So `steps(14, end)` on a 14-keyframe animation splits each gap into 14 steps. It doesn't give 14 equal frames.

For frame-by-frame swaps, such as cycling `content` through glyphs, use `step-end` (the same as `steps(1, end)`). Each gap holds its starting value until the next keyframe:

```scss
$frames: '█' '▉' '▊' '▋' '▌' '▍' '▎' '▏' '▎' '▍' '▌' '▋' '▊' '▉';
$count: list.length($frames);

.spinner::after {
    content: list.nth($frames, 1);
    animation: spin ($count * 80ms) step-end infinite;
}

@keyframes spin {
    @for $i from 1 through $count {
        #{math.percentage(math.div($i - 1, $count))} {
            content: list.nth($frames, $i);
        }
    }
}
```

Keyframe percentages can be decimals (`7.1428571429%`), so frame counts that don't divide 100 need no rounding.

`content` can't be tweened. Without a step timing function it flips halfway between keyframes, which shifts every frame by half a step.
