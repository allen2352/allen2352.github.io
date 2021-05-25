var adobe="";
var adobelist=['Ps','Ai','Id','Dw','Ae','Pr','Xd'];
var adobe_content={'Ps':'Photoshop mainly deals with digital images composed of pixels. Using its numerous editing and drawing tools, you can more effectively edit pictures. The unique history record floating window and editable layer effect function allow users to conveniently test the effect. The support for various filters also enables users to easily create various fantasy effects.',
                   'Ai':'Illustrator CC vector graphics and illustrations.It is the industry standard vector drawing environment, which can be designed in the media room. Show your creative ideas through shapes, colors, effects and printing styles. Even if you are dealing with large and complex files, you can maintain speed and stability, and you can efficiently switch designs between Adobe creative applications.',
                   'Id':'InDesign CC page design, layout and publishing.A professional typesetting application, which can perfectly control each pixel in the design and printing style. It is an indispensable tool for art editors of newspapers, magazines, and publishing houses.',
                   'Dw':'Dreamweaver CC website, application programming and coding.Provides an intuitive visual effects interface that can be used to create and edit websites, and provide compatibility with the latest Internet standards, while providing top-level support for HTML5/CSS3 and jQuery.',
                   'Ae':"After Effects CC theater-like visual effects and animated graphics.Use the industry's animation and composition standards to present movie-like visual effects, and delicate dynamic graphics, control your creativity with one hand, and at the same time provide outstanding performance that has never been seen before.",
                   'Pr':'Premiere Pro CC video production and editing.Regardless of various video media, even videos shot on mobile phones can be freely imported and combined, and then edited in native form without transcoding. It is the most commonly used non-linear editor for video editing personnel.',
                   'Xd':'Adobe XD (Adobe Experience Design) is a vector drawing software released by Adobe Inc. It is used to design the user experience of web pages and mobile applications. It can be used on macOS, Windows 10, iOS and Android. XD has the functions of vector drawing design and website wireframe design, which can create simple click interactive prototypes.'};
var adobe_color={'Ps':'info','Ai':'warning','Id':'danger','Dw':'success','Ae':'secondary','Pr':'dark','Xd':'danger'};
var adobe_url={'Ps':'https://drive.google.com/uc?export=download&id=1h-mtApZSQPrhqCj0yQ35p9fUICsv7dLZ',
               'Ai':'https://drive.google.com/uc?export=download&id=1WPhrok3qNsgtIOBbpi5Rp5uHkIpIIoF-',
               'Id':'https://drive.google.com/uc?export=download&id=1kNUEtIefQJybq2RxBGi78o9I2ElXgwsz',
               'Dw':'https://drive.google.com/uc?export=download&id=1Cuzuh6rQu-oIbliTYH-n_6wwUfw21GXw',
               'Ae':'https://drive.google.com/uc?export=download&id=1vWTCixkFGBduDzfO8pXXtzTIoJ9bT7X7',
               'Pr':'https://drive.google.com/uc?export=download&id=1oDB47PrQDsvQnwDAhdTbg4JtcHM4-jP8',
               'Xd':'https://drive.google.com/uc?export=download&id=1tY8yziPGBXAMCLTz5Lo-HeEX7vuPowDx'};
function loadadobe(key){
    adobe=key;
    $("#downloadadobe").html('<a type="button" class="btn btn-outline-'+adobe_color[adobe]+'" href="'+adobe_url[adobe]+'"><img class="smallicon" src="image/button/'+adobe+'.ico">&nbsp;Download</button></div>');
}
function downloadadobe(key){

}
var text='';
for(var i=0;i<adobelist.length;i++){
    text+='<button class="btn btn-outline-'+adobe_color[adobelist[i]]+'" style="width: 59vw;" onclick="loadadobe('+"'"+adobelist[i]+"'"+')"><img src="image/button/'+adobelist[i]+'.ico" class="icon"><div class="text">'+adobe_content[adobelist[i]]+'</div></button><div style="height:0.5vh;"></div>';
}
$("#Adobedownloadboard").html(text)