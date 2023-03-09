import {Comments} from './reviews';
type CallBackCommentFunction = (count: number) => Comments;

export function getRandomComments(comments: Comments): CallBackCommentFunction {
  return function (count = 5) {
    const result: Comments = [];
    const copyComments = [...comments];
    for (let i = 0; i < count; i++) {
      const randomNumber: number = Math.floor(Math.random() * copyComments.length);
      const comment = copyComments.splice(randomNumber, 1)[0];
      if (comment) {
        result.push(comment);
      }
    }
    return result;
  };
}
