import level1 from './level1.js'
import level2 from './level2.js'

export default function buildLevel(num, ctx){
  switch(num){
    case 1:
      return level1(ctx)
      break;
    case 2:
      return level2(ctx)
      break;
  }
}
