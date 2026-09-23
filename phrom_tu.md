ui:unicode_india(10 slots of 0x80 , 0x900-0xD800) 

ui : (uh,ub,up,ug,uo,ut,uj,uk,um,us)
—----
ui->(uh38, ub38 ,  so on till us38) : 8+4*6+2+4*1 = 38 : eksample uh38 : 

a i u e o h N R

अ

क ख ग घ

च छ ज झ

ट ठ ड ढ

त थ द ध

न

प फ ब भ

म

य र ल व

स श

ह
—----
xh38/xh38/xp38/xg38/xo38/xT38/xT38/xm38: 8+4*6+2+4*1 = 38 :

a i u e o h N R

A

k K g G

c C z Z

t J/th d Q/dh

T j/Th D q/Dh

n

p f b B

m

u r l w

s S

H/v

```
static phrom_dikt: { [key: string]: string }  =  {
e52: 'e52', u10: 'u10', 
// e52u10: 'e52u10' please remove e52u10
};


static tu_dikt: { [key: string]: string }  =  {
e23: 'e23',
xi38: 'xi38',
xe38: 'xe38',

uh38: 'uh38', ub38: 'ub38',up38: 'up38', ug38: 'ug38', uo38: 'uo38', uj38: 'uj38', ut38: 'ut38', um38: 'um38',uk38: 'uk38', us38: 'us38', umr38: 'umr38',

xh38: 'xh38', xb38: 'xb38',xp38: 'xp38', xg38: 'xg38', xo38: 'xo38', xj38: 'xj38', xt38: 'xt38', xm38: 'xm38',xk38: 'xk38', xs38: 'xs38', xmr38: 'xmr38',

};
```

phrom -> tu list:

1. English -> e23
2. English -> xe38 (eng->transliterate(punzabi) -> unicode->xi38)
3. English -> translate()->uh/ub/…->xh38/xb38/…
4. English -> translate()->uh/ub/…->uh38/ub38/…
5. unicode -> ui38
6. unicode -> xi38







