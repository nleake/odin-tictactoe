const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (newBoard) => {
    board = newBoard;
  };
  return { getBoard, setBoard };
}   )();