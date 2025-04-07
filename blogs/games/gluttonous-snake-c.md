---
title: 贪吃蛇C语言实现
layout: doc
tags: [ c, game, gluttonous snake]
---

```cpp
#include<stdio.h>
#include<time.h>
#include<windows.h>
#include<stdlib.h>

#define U 1
#define D 2
#define L 3
#define R 4 //蛇的状态，U：上 ；D：下；L:左 R：右

typedef struct SNAKE { //蛇身的一个节点
    int x;
    int y;
    struct SNAKE *next;
} snake;

//全局变量//
int score=0,add=1;//总得分与每次吃食物得分。
int status,sleeptime=300;//每次运行的时间间隔
snake *head, *food;//蛇头指针，食物指针
snake *q;//遍历蛇的时候用到的指针
int endgamestatus=0; //游戏结束的情况，1：撞到墙；2：咬到自己；3：主动退出游戏。
int MapWidth = 56, MapHeigth = 26;

//声明全部函数//
void Pos();
void creatMap();
void initsnake();
int biteself();
void createfood();
void cantcrosswall();
void snakemove();
void pause();
void gamecircle();
void welcometogame();
void endgame();
void gamestart();

void Pos(int x,int y) { //设置光标位置
    COORD pos;
    HANDLE hOutput;
    pos.X = x;
    pos.Y = y;
    hOutput = GetStdHandle( STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hOutput,pos);
}

void creatMap() { //创建地图
    int i;
    for(i = 0; i < MapWidth + 2; i++) { //打印上下边框
        Pos(i,0);
        printf("$");
        Pos(i, MapHeigth + 1);
        printf("$");
    }
    for(i = 1; i < MapHeigth + 2; i++) { //打印左右边框
        Pos(0,i);
        printf("$");
        Pos(MapWidth + 1,i);
        printf("$");
    }
}

void initsnake() { //初始化蛇身
    snake *tail;
    int i;
    tail = (snake*)malloc(sizeof(snake));//从蛇尾开始，头插法，以x,y设定开始的位置//
    tail->x = 24;
    tail->y = 5;
    tail->next = NULL;
    for(i=1; i<=4; i++) {
        head = (snake*)malloc(sizeof(snake));
        head->next = tail;
        head->x = 24 + i;
        head->y = 5;
        tail = head;
        }
    while(tail != NULL) { //从头到为，输出蛇身
        Pos(tail->x, tail->y);// 移动光标
        printf("#");
        tail = tail->next;
    }
}

int biteself() { //判断是否咬到了自己
    snake *self;
    self = head->next;
    while(self != NULL) {
        if(self->x == head->x && self->y == head->y) {
            return 1;
        }
        self = self->next;
    }
    return 0;
}
void createfood() { //随机出现食物
    snake *food_1;
    srand((unsigned)time(NULL));
    food_1 = (snake*)malloc(sizeof(snake));
    // 保证食物在地图中
    food_1->x = rand() % MapWidth + 1;
    food_1->y = rand() % MapHeigth + 1;
  
    q = head;
    //检查蛇身是否与食物重合
    while(q->next != NULL) {
        if(q->x == food_1->x && q->y==food_1->y) {
            free(food_1);
            createfood();
        }
        q = q->next;
    }
    // 出现食物
    Pos(food_1->x,food_1->y);
    food = food_1;
    printf("@");
}

void cantcrosswall() { //不能穿墙
    if(head->x == 0 || head->x == MapWidth ||head->y==0 || head->y == MapHeigth) {
        endgamestatus=1;
        endgame();
    }
}

void snakemove() { //蛇前进,上U,下D,左L,右R
    cantcrosswall();
    if(biteself()) { //判断是否会咬到自己
        endgamestatus = 2;
        endgame();
    }
      
    snake * nexthead;
  
    nexthead=(snake*)malloc(sizeof(snake));
  
    if(status==U) {// 向上移动
        nexthead->x=head->x;
        nexthead->y=head->y-1;
    }else if(status==D) {// 向下移动
        nexthead->x=head->x;
        nexthead->y=head->y+1;
    }else if(status==L) {// 向左移动
        nexthead->x=head->x-1;
        nexthead->y=head->y;
    }else if(status==R) {// 向右移动
        nexthead->x=head->x+1;
        nexthead->y=head->y;
    }
    if(nexthead->x == food->x && nexthead->y==food->y) { //如果下一个有食物//
        nexthead->next = head;
        head = nexthead;
        q = head;
      while(q!=NULL) {
        Pos(q->x,q->y);
        printf("#");
        q=q->next;
        }
      score = score + add;
      createfood();
      } else { //如果没有食物//
      nexthead->next = head;
      head = nexthead;
      q = head;
      while(q->next->next!=NULL) {
        Pos(q->x,q->y);
        printf("#");
        q=q->next;
        }
      Pos(q->next->x,q->next->y);
      printf(" ");
      free(q->next);
      q->next=NULL;
      }
  
}

void pause() { //暂停
  while(1) {
    Sleep(300);
    if(GetAsyncKeyState(VK_SPACE)) {
      break;
    }
  }
}
void gamecircle() { //控制游戏
  Pos(64,15);
  printf("不能穿墙，不能咬到自己");
  Pos(64,16);
  printf("用↑.↓.←.→分别控制蛇的移动.");
  Pos(64,17);
  printf("ESC ：退出游戏.space：暂停游戏.");
  status=R;
  while(1) {
    Pos(64,10);
    printf("得分：%d ",score);
    Pos(64,11);
    printf("每个食物得分：%d分",add);
    Sleep(sleeptime);
    if(GetAsyncKeyState(VK_UP) && status != D) {
      status = U;
    } else if(GetAsyncKeyState(VK_DOWN) && status!=U) {
      status=D;
    } else if(GetAsyncKeyState(VK_LEFT)&& status!=R) {
      status=L;
    } else if(GetAsyncKeyState(VK_RIGHT)&& status!=L) {
      status=R;
    } else if(GetAsyncKeyState(VK_SPACE)) {
      pause();
    } else if(GetAsyncKeyState(VK_ESCAPE)) {
      endgamestatus=3;
      break;
    }
    snakemove();
  }
}

void welcometogame() { //开始界面
  Pos(40,12);
  system("title 贪吃蛇");
  Pos(40,15);
  printf("不倒翁 AIoT 创新创业协会欢迎你的到来");
  Pos(40,18);
  printf("开启你的体验");
  Pos(40,25);
  system("pause");
  system("cls");
}
void endgame() { //结束游戏
  system("cls");
  Pos(24,12);
  if(endgamestatus==1) {
    printf("对不起，您撞到墙了。游戏结束.");
  } else if(endgamestatus==2) {
    printf("对不起，您咬到自己了。游戏结束.");
  } else if(endgamestatus==3) {
    printf("您的已经结束了游戏。");
  }
  Pos(24,13);
  printf("您的得分是%d\\n",score);
  exit(0);
}
void gamestart() { //游戏初始化
  system("mode con cols=100 lines=30");
  welcometogame();
  creatMap();
  initsnake();
  createfood();
}
int main() {
  gamestart();
  
  gamecircle();	
  endgame();	
  return 0;
}
```
