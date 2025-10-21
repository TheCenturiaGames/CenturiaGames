function spritesheet_loop(src, columns, img_width, img_height, arr){
    let img_obj = {
        'source': null,
        'current': arr[0][0],
        'width': img_width,
        'height': img_height,
        'columns': columns,
        'index': 0,
        'arr': arr
    };

    let img = new Image();
    img.onload = function () {
        img_obj.source = img;
    }
    img.src = src;
    function draw_anim(context, x, y) {
        let im_i = img_obj.current % img_obj.columns;
        let im_j = (img_obj.current - im_i) / img_obj.columns;

        if (img_obj.source != null)
            context.drawImage(img_obj.source, im_i * img_obj.width, im_j * img_obj.height,
                img_obj.width, img_obj.height,
                x, y, img_obj.width, img_obj.height);
        img_obj.current = (img_obj.current + 1);
        if(img_obj.current > img_obj.arr[img_obj.index][1]){
            if(img_obj.index < img_obj.arr.length - 1) img_obj.index += 1;
            img_obj.current = img_obj.arr[img_obj.index][0];
        }
    }
    return draw_anim;
}

let hound = spritesheet_loop("assets/images/spritesheets/hound.png", 11, 539, 436,
    [[0, 25], [26, 136]]);

let logo = spritesheet_loop("assets/images/spritesheets/logo.png", 5, 538.5, 621.5,
    [[0, 22], [22, 22]]);

function on_body_load() {
    let canvas = document.createElement("canvas");
    canvas.width = 539;
    canvas.height = 480;
    canvas.setAttribute("class", "bigcanvas");
    document.getElementById("wolf_placeholder").appendChild(canvas);
    let context = canvas.getContext("2d");

    setInterval(() => {
        context.clearRect(-1, -1, canvas.width+2, canvas.height+2);
        hound(context, 0, 0);
        logo(context, 0, -100);
    }, 1000/30);
}