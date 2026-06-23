.MODEL     SMALL
.STACK     64
; --------------------------------------
.DATA  
currentGP  db 10 dup(?)       
tempGP     db 9 dup(?)
gamePiece1 db 0,39,0,40,0,41,0,42,4; line
gamePiece2 db 1,40,1,41,0,40,0,41,2; square
gamePiece3 db 0,41,2,40,0,40,1,40,2; Knight
      
colorsNum   EQU 5      
cols    db 80

two     db 2 
four    db 4 
black   db 7
red     db 11000000b
green   db 10100000b
blue    db 10010000b
purple  db 11010000b
white   db 11110000b
; --------------------------------------
.CODE    
; bx <- coordinates of screen point
; returns location on screen on bx
calcScreenLoc PROC
        push ax    
        
        xor ah, ah
        mov al, bl
        mul cols     ;row *80
        mov bl,bh
        xor bh, bh
        add ax, bx    ; +colomn
        mov bx, ax      
        
        mov al, ah
        xor ah, ah
        mul two       ;ah*2
        mov bh, al
        mov al, bl
        mul two      ;al *2
        add ah, bh
        inc al        ;+1
        mov bx, ax 
        
        pop ax
    ret
calcScreenLoc ENDP 

; moves currentGP down
moveDown PROC
    push cx
    push dx
    push si 
    
    lea si, currentGP 
     
    mov dl, black         ;black
    call printPiece
    
    call movePieceDown
    mov dl, [si+9]
    call printPiece   
    
    pop si
    pop dx
    pop cx
    ret          
moveDown ENDP  

movePieceDown PROC
    push cx
    push si 
    
    mov cx, 4
    downLoop:
        inc [si]
        add si,2
    loop downLoop         
    
    pop si
    pop cx
    ret
movePieceDown ENDP

; dx <- color  
; prints currentGP
printPiece PROC    
    push si
    push cx
    push bx
    
    lea si, currentGP
    
    mov cx, 4
    printLoop:
        mov bx, [si]  
        call calcScreenLoc  
        mov  es:[bx],   dx
        add si, 2
    loop printLoop  
    
    pop bx
    pop cx
    pop si
    ret
printPiece ENDP  

; assigns a random color to currentGP
setRandomColor PROC
    push di 
    push si
    push ax
    push cx
    
    mov ah, 0
    int 1AH 
    
    and dl, colorsNum
    xor dh, dh
    lea si, red
    add si, dx   
    mov al, [si]   
    
    lea si, currentGP  
    mov [si+9], al   
    mov dl, al
       
    pop cx      
    pop ax
    pop si
    pop di
    ret    
setRandomColor ENDP   

; returns on al if true/false
checkDownAva PROC
    push bx  
    push cx
    push si
    push di
    
    mov si,offset tempGP 
    call movePieceDown
                   
    mov al, black              
    mov cl, [si+8]        
    xor ch, ch       
    checkDownLoop:    
        mov bx, [si]
        call calcScreenLoc
        cmp es:[bx], al
        jne full       ; screen[bx] != 0: jmp full
        
        add si, 2
    loop checkDownLoop
     
    mov al, 1 
  checkDownEnd:
        
    pop di        
    pop si
    pop cx
    pop bx              
    ret 
  full:
    mov al, 0
    jmp checkDownEnd
checkDownAva ENDP
               
;di <- source gamePiece address               
;si <- dest   gamePiece address
copyTo PROC
    push ax
    push cx
    push si
    push di                
    
    mov cx, 9
    copyLoop:
        mov al, [di]
        mov [si], al
        inc si
        inc di
    loop copyLoop
    
    pop di
    pop si
    pop cx
    pop ax
    ret             
copyTo ENDP                 

start:
	mov     ax,@DATA
	mov     ds,ax
    
	mov ah, 0
	mov al, 3
	int 10h
    	
	push 0B800H
    	pop es
    
    mov di, offset gamePiece1
    
    mov cx, 3
    multiDownLoop:
        
        call setRandomColor
        mov si, offset currentGP  
        call copyTo 
        mov si, offset tempGP
        call copyTo
        call printPiece 
        
        push cx
        mov cx, 6
        singleDownLoop: 
            call checkDownAva
            cmp al, 0
            je continueMultiLoop
            call moveDown
        loop singleDownLoop   
   continueMultiLoop:
    add di, 9
	pop cx
	loop multiDownLoop
	
	mov     ah,4CH
	mov     al,0
	int     21H
END start

