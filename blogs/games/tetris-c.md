---
title: 俄罗斯方块C语言实现
layout: doc
---

# 俄罗斯方块C语言实现

<el-divider />
<div style='display: flex;gap: 10px;'>
  <el-tag>C</el-tag>
  <el-tag>game</el-tag>
  <el-tag>tetris</el-tag>
</div>

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <windows.h>
#define UI_WIDTH 14 //显示界面的宽度
#define UI_HEIGHT 25 //界面的高度
#define WALL 1
#define BLOCK 2
// 四个按键方向
#define U 1
#define D 2
#define L 3
#define R 4
#define MapWidth 15
#define MapHeigth 30
#define TRUE 1
#define FALSE 0
void welcometogame();
void initia();			//初始化的一些工作
void gameShow(); 	/*游戏显示界面*/
void moveBlock(); 	/*方块的移动*/
short isCanMoveBlock(short x, short y); 	//是否能移动方块
void produceBlock();   //产生方块
void toBottom(short x, short y);				//方块到底了之后的操作 ，bottom：底
void pause(); //游戏暂停
void creatMap();
void Pos(int x,int y);
void welcometogame();
short cur_block_coord_x ,cur_block_coord_y; //当前方块的横坐标及纵坐标//
int game_arr[UI_HEIGHT][UI_WIDTH]; //游戏的界面数组
short next_blockarr[4][4];			//用来存放下一个方块的数组
short cur_boxindex,next_boxindex; //记录当前方块的下标和下一个方块的下标
int score = 0;  //成绩
int status; // 按键状态
HANDLE hOutput;
int flashTime = 100;
int flashT = 1;
struct _game_arr {
	short info;  //用来存放游戏界面的数组
	short  var;  //用来记录该数组的某个位置是否被占用 ，当方块没有移动了，	//该位置才被占用，当移动方块是那个地方被占用就不能移动了 ,用1表示占用，0表示未占用
} game_arr[UI_HEIGHT][UI_WIDTH];
struct _block {
	short a[4][2]; /*定义方块形状的数组，每个方块共有4个小块组成，	 用4行2列来记录每个小方块的相对 坐标， */
	short next; //下一个方块的号码
};
struct _block block[19]= {	//初始化各个游戏方块, 总共有19总方块形状
	{ 1, 1, 1, 2, 1, 3, 2, 3, 1},
	{ 0, 2, 1, 2, 2, 2, 0, 3, 2},
	{ 0, 1, 1, 1, 1, 2, 1, 3, 3},
	{ 2, 1, 0, 2, 1, 2, 2, 2, 0},
	{ 1, 1, 1, 2, 0, 3, 1, 3, 5},
	{ 0, 1, 0, 2, 1, 2, 2, 2, 6},
	{ 1, 1, 2, 1, 1, 2, 1, 3, 7},
	{ 0, 2, 1, 2, 2, 2, 2, 3, 4},
	{ 1, 1, 0, 2, 1, 2, 2, 2, 9},
	{ 1, 1, 1, 2, 2, 2, 1, 3,10},
	{ 0, 2, 1, 2, 2, 2, 1, 3,11},
	{ 1, 1, 0, 2, 1, 2, 1, 3, 8},
	{ 1, 1, 1, 2, 2, 2, 2, 3,13},
	{ 1, 2, 2, 2, 0, 3, 1, 3,12},
	{ 2, 1, 1, 2, 2, 2, 1, 3,15},
	{ 0, 2, 1, 2, 1, 3, 2, 3,14},
	{ 1, 0, 1, 1, 1, 2, 1, 3,17},
	{ 0, 2, 1, 2, 2, 2, 3, 2,16},
	{ 1, 1, 2, 1, 1, 2, 2, 2,18}
};
void Pos(int x,int y) { //设置光标位置
	COORD pos;
	HANDLE hOutput;
	pos.X = x;
	pos.Y = y;
	hOutput=GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleCursorPosition(hOutput,pos);
}
int main() {
	system("mode con cols=40 lines=30");
	welcometogame();
	initia();	//隐藏缓冲区的光标
	CONSOLE_CURSOR_INFO cci;
	cci.bVisible = 0;
	cci.dwSize =1;
	SetConsoleCursorInfo(hOutput, &cci);
	produceBlock();
	moveBlock();
}
void initia() {	//初始化的一些工作
	short i,j;
	for(i = 0; i < UI_HEIGHT; i++) {
		for(j = 0; j < UI_WIDTH; j++) {
			if(i == 0 || i == UI_HEIGHT-1) {
				game_arr[i][j].info = WALL;    //.var=1表示该点被占用
				game_arr[i][j].var = 1;
				continue;
			}
			if(j == 0 || j == UI_WIDTH-1)  {
				game_arr[i][j].info = WALL;
				game_arr[i][j].var = 1;
				continue;
			}
		}
	}
	next_boxindex =  rand() % 19;	 //第一次要随机产生两个方块
}
/*游戏显示界面*/
void gameShow() {
	short i,j;
	for(i = 0; i < UI_HEIGHT; i++) {
		for(j = 0; j < UI_WIDTH; j++) {
			if(game_arr[i][j].info == 0) {
				Pos(j, i);
				printf(" ");
				continue;
			}
			if(game_arr[i][j].info == WALL) {
				Pos(j, i);
				printf("$");
				continue;
			}
			if(game_arr[i][j].info == BLOCK) {
				Pos(j, i);
				printf("#");
			}
		}
		if(i == 1)
			printf("  下一个方块");
		if(i >= 2 && i <= 5) { //下一个方块
			printf("  ");
			for(j = 0; j < 4; j++) {
				if(next_blockarr[i-2][j] == 0)
					printf(" "); //要减2，因为从i事从2开始的
				else
					printf("#");
			}
		}
		printf("\\n");
	}
	Pos(20 , 10);
	printf("得分：%d",score);
}/*每一个方块的产生*/
void produceBlock() {	//在游戏界面的中间放置方块
	short i,j;
	cur_boxindex = next_boxindex;
	next_boxindex = rand() % 19; //方块的编号随机产生
	cur_block_coord_x = (UI_WIDTH)/2; //从中间落下
	cur_block_coord_y = 1;
	for(i = 0; i < 4; i++)
		for(j = 0; j < 4; j++)
			next_blockarr[i][j] = 0; //每次产生新的方块，都要将存放下一个方块的数组清零
	for(i = 0; i < 4; i++) {
		game_arr[cur_block_coord_y+block[cur_boxindex].a[i][1]][cur_block_coord_x+block[cur_boxindex].a[i][0]].info = BLOCK ;
		next_blockarr[block[next_boxindex].a[i][1]][block[next_boxindex].a[i][0]] = BLOCK;
	}
	if( !isCanMoveBlock(cur_block_coord_x,cur_block_coord_y)) { //产生新方块的这个地方被占用了，退出
		printf("游戏结束，再接再厉！");
		exit(0);
	}
}/*方块的移动*/
void moveBlock() {
	short i,j,to_bottom = FALSE;	//到底
	short old_x = cur_block_coord_x,old_y = cur_block_coord_y; //用来记录旧的方块的位置
	short old_boxindex = cur_boxindex;    //记录方块的下标，按上键时改变方块用
	while(1) {
		old_x = cur_block_coord_x,old_y = cur_block_coord_y;
		old_boxindex = cur_boxindex;
		status = 0;// 防止重复
		if(GetAsyncKeyState(VK_UP)) {
			status = U;
		} else if(GetAsyncKeyState(VK_DOWN)) {
			status=D;
		} else if(GetAsyncKeyState(VK_LEFT)) {
			status=L;
		} else if(GetAsyncKeyState(VK_RIGHT)) {
			status=R;
		} else if(GetAsyncKeyState(VK_SPACE)) {
			pause();
		}
		switch(status) {
			case U:
				cur_boxindex = block[cur_boxindex].next;
				if(!isCanMoveBlock(cur_block_coord_x, cur_block_coord_y))
					cur_boxindex = old_boxindex;  //如果不能旋转的话要还原
				break;
			case D:
				for(i = 0; i < 2; i++) //一次可以下降4个
					if(isCanMoveBlock(cur_block_coord_x, cur_block_coord_y + 1)) cur_block_coord_y++;
					else  {
						to_bottom = TRUE;    //到底
						break;
					}
				break;
			case L:
				if(isCanMoveBlock(cur_block_coord_x - 1, cur_block_coord_y)) cur_block_coord_x -= 1;
				break;
			case R:
				if(isCanMoveBlock(cur_block_coord_x + 1, cur_block_coord_y)) cur_block_coord_x += 1;
				break;
		}
		if(to_bottom) {
			if(old_x != cur_block_coord_x || old_y != cur_block_coord_y || old_boxindex != cur_boxindex) {
				for(i = 0; i < 4; i++)
					game_arr[old_y+block[old_boxindex].a[i][1]][old_x+block[old_boxindex].a[i][0]].info = 0;
				for(i = 0; i < 4; i++)
					game_arr[cur_block_coord_y+block[cur_boxindex].a[i][1]][cur_block_coord_x+block[cur_boxindex].a[i][0]].info = BLOCK;
				gameShow();  //要按键之后才刷新
			}
			to_bottom = FALSE;
			toBottom(cur_block_coord_x, cur_block_coord_y);
			gameShow();//到底
		} else {
			if(j++ % 10 == 0) { //自动下移,要放前面，
				if(isCanMoveBlock(cur_block_coord_x, cur_block_coord_y + 1)) cur_block_coord_y++;
				else  to_bottom = TRUE; //到底
			}
			if(old_x != cur_block_coord_x || old_y != cur_block_coord_y || old_boxindex != cur_boxindex) {
				for(i = 0; i < 4; i++)
					game_arr[old_y+block[old_boxindex].a[i][1]][old_x+block[old_boxindex].a[i][0]].info = 0;
				for(i = 0; i < 4; i++)
					game_arr[cur_block_coord_y+block[cur_boxindex].a[i][1]][cur_block_coord_x+block[cur_boxindex].a[i][0]].info = BLOCK;
				gameShow();  //要按键之后才刷新
			}
		}
		if(flashT % 100 < 2) {
			flashT = (flashT + 2) % 100;
			flashTime -= 5;
			if(flashTime < 30) {
				flashTime = 30;
			}
		}
		Sleep(flashTime);
	}
}

short isCanMoveBlock(short x, short y) {	//是否能移动方块
	short i;
	for(i=0; i<4; i++)
		if(game_arr[y+block[cur_boxindex].a[i][1]][x+block[cur_boxindex].a[i][0]].var)
			return FALSE;	//如果该位置以及有方块填充，则不能移动
	return TRUE;
}
void toBottom(short x, short y) {	//方块到底之后的操作，1.将方块的位置的状态变为1，表示被占用。2.是否满块，消行，改变状态 3.产生新的方块
	short i,j;
	for(i = 0; i < 4; i++)
		game_arr[y+block[cur_boxindex].a[i][1]][x+block[cur_boxindex].a[i][0]].var = 1;	//2.是否满块，消行，改变状态
	for(i = UI_HEIGHT - 2; i >= 1; i--) { //有两行是墙 ,从底开始往上搜
		for(j = 1; j <= UI_WIDTH - 2; j++) {
			if( !game_arr[i][j].var)
				break;//一行有空的就跳出这个循环 ，继续搜下一行
			if(j == UI_WIDTH - 2) {	//一行都满了,消行,此时第i行是满行
				score += 10;
				int h,v;
				for(v = i; v >= 2; v--) { //第i行开始,
					for(h = 1; h <= UI_WIDTH - 2; h++) {
						game_arr[v][h].info = game_arr[v-1][h].info;
						game_arr[v][h].var = game_arr[v-1][h].var;
					}
				}//要从底行重新,之后i--,i =  UI_HEIGHT - 2,就会出现多行一起消时有行消不了
				i = UI_HEIGHT - 1;
			}
		}
	}
	produceBlock();
}
void welcometogame() { //开始界面
	Pos(6,6);
	system("title 简易俄罗斯方块");
	printf("欢迎来到俄罗斯方块游戏！");
	Pos(1,12);
	printf("不倒翁 AIoT 创新创业协会欢迎你的到来");
	Pos(2,18);
	printf("请开启你的体验");
	Pos(6,25);
	system("pause");
	system("cls");
}
void pause() { //暂停
	while(1) {
		Sleep(300);
		if(GetAsyncKeyState(VK_SPACE)) {
			break;
		}
	}
}
```
