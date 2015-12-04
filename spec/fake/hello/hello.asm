; Hello World
; John Harrison
; With lots o' code borrowed from all over the place

INCLUDE "gbhw.inc" ; standard hardware definitions from devrs.com


INCLUDE "ibmpc1.inc" ; ASCII character set from devrs.com

SECTION	"Vblank",HOME[$0040]
	reti
SECTION	"LCDC",HOME[$0048]
	reti
SECTION	"Timer_Overflow",HOME[$0050]
	reti
SECTION	"Serial",HOME[$0058]
	reti
SECTION	"p1thru4",HOME[$0060]
	reti


SECTION	"start",HOME[$0100]
  nop
  jp	begin
	ROM_HEADER	ROM_NOMBC, ROM_SIZE_32KBYTE, RAM_SIZE_0KBYTE

INCLUDE "memory.asm"


TileData:
	chr_IBMPC1	1,8 ; LOAD ENTIRE CHARACTER SET


begin:

	di

	ld	sp, $ffff		; set the stack pointer to highest mem location we can use + 1


init:
	ld	a, %11100100 	; Window palette colors, from darkest to lightest
	ld	[rBGP], a		; CLEAR THE SCREEN


	ld	a,0			; SET SCREEN TO TO UPPER RIGHT HAND CORNER
	ld	[rSCX], a
	ld	[rSCY], a


	call	StopLCD		; YOU CAN NOT LOAD $8000 WITH LCD ON
	

	ld	hl, TileData
	ld	de, _VRAM		; $8000
	ld	bc, 8*256 		; the ASCII character set: 256 characters, each with 8 bytes of display data
	call	mem_CopyMono	; load tile data
	
	ld	a, LCDCF_ON|LCDCF_BG8000|LCDCF_BG9800|LCDCF_BGON|LCDCF_OBJ16|LCDCF_OBJOFF 
	ld	[rLCDC], a	
	

	ld	a, 32		; ASCII FOR BLANK SPACE
	ld	hl, _SCRN0
	ld	bc, SCRN_VX_B * SCRN_VY_B
	call	mem_SetVRAM

	

	ld	hl,Title
	ld	de, _SCRN0+3+(SCRN_VY_B*7) ; 
	ld	bc, TitleEnd-Title
	call	mem_CopyVRAM
	
wait:
	halt
	nop
	jr	wait
	
Title:
	DB	"Hello World !"
TitleEnd:

StopLCD:
        ld      a,[rLCDC]
        rlca                    ; Put the high bit of LCDC into the Carry flag
        ret     nc              ; Screen is off already. Exit.


.wait:
        ld      a,[rLY]
        cp      145             ; Is display on scan line 145 yet?
        jr      nz,.wait        ; no, keep waiting


        ld      a,[rLCDC]
        res     7,a             ; Reset bit 7 of LCDC
        ld      [rLCDC],a

        ret

