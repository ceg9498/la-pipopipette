import { Component, OnInit } from '@angular/core';

const EMPTY = '--';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  width = 5;
  height = 8;
  board = new Array();
  name = 'Line Game';

  ngOnInit() {
    for(let y=0; y<(this.height*2+1); y++){
      let row = new Array();
      for(let x=0; x<(this.width*2+1); x++){
        let piece:string;
        if(isEven(y)){
          if(isEven(x)){
            piece = "dot";
          } else {
            piece = "h-line"
          }
        } else {
          if(isEven(x)){
            piece = "v-line";
          } else {
            piece = "box"
          }
        }
        if(piece === "box"){
          row.push({
            value: EMPTY,
            x: x,
            y: y,
            piece: piece
          });
        } else if(piece === "v-line" || piece === "h-line") {
          row.push({
            selected: false,
            x: x,
            y: y,
            piece: piece
          });
        } else {
          row.push({
            x: x,
            y: y,
            piece: piece
          });
        }
      }
      this.board.push({values:row, rowType:isEven(y) ? 'row-line' : 'row-box'});
    }
  }

  onClick(x, y){
    let piece = this.board[y].values[x].piece;
    if(piece === "v-line"){
      this.selectVLine(x, y);
    } else if(piece === "h-line"){
      // check the y index +/-1
      this.selectHLine(x, y);
    }
  }

  selectVLine(x, y){
    this.board[y].values[x].selected = true;
    // check the x index +/-1
    // x+1 first:
    if(x !== this.width*2){
      if(this.board[y].values[x+1].value === EMPTY){
        this.checkBox(x+1, y);
      }
    }
    // then check x-1:
    if(x !== 0){
      if(this.board[y].values[x-1].value === EMPTY){
        this.checkBox(x-1, y);
      }
    }
  }

  selectHLine(x, y){
    this.board[y].values[x].selected = true;
    // check the y index +/-1
    // y+1 first:
    if(y !== this.height*2){
      if(this.board[y+1].values[x].value === EMPTY){
        this.checkBox(x, y+1);
      }
    }
    // then check y-1:
    if(y !== 0){
      if(this.board[y-1].values[x].value === EMPTY){
        this.checkBox(x, y-1);
      }
    }
  }

  checkBox(x, y){
    // check if all surrounding lines are selected
    if(this.board[y].values[x-1].selected &&
        this.board[y].values[x+1].selected &&
        this.board[y-1].values[x].selected &&
        this.board[y+1].values[x].selected){
      this.board[y].values[x].value = "AA";
    }
  }
}

function isEven(num){
  return num%2 === 0 ? true : false;
}
