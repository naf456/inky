const $ = window.jQuery = require('./jquery-2.2.3.min.js');

const editor = ace.edit("editor");

const widthLimit = 100;
const LIMIT = 100;

$(document).ready(() => {
    $(".split").each(function() {

        var $split = $(this);
        //var $left = $split.prev();
        var $top = $split.prev();
        //var $right = $split.next();
        var $bottom = $split.nextAll();
        var $parent = $split.parent();

        console.log($bottom)

        var $grip = $split.append(`<div class="grip"></div>`);

        var isDragging = false;

        $grip.mousedown(function() {
            isDragging = true;
            event.preventDefault();
        });
        $(document).mousemove(function(event) {
            if( isDragging ) {

                var y = event.pageY;
                var height = $parent.height();

                if( y < LIMIT )
                    y = LIMIT;
                if( y > height - LIMIT) 
                    y = height - LIMIT;

                var percent = 100 * (y / height);
                var fromTop = percent + "%";
                var fromBottom = (100-percent) + "%";

                $top.css({"bottom": fromBottom});
                $bottom.css({"top": fromTop});
                $split.css({"top": fromTop});                

                /*var x0 = $parent.offset().left;
                var x = event.pageX - x0;
                var width = $parent.width();

                if( x < widthLimit )
                    x = widthLimit;
                if( x > width-widthLimit )
                    x = width-widthLimit;

                var percent = 100 * (x / width);
                var fromLeft = percent + "%";
                var fromRight = (100-percent) + "%";

                $left.css({"right": fromRight, "width": fromLeft});
                $right.css({"left": fromLeft, "width": fromRight});
                $split.css("left", fromLeft);*/

                // Hack... not sure of a better way to do this
                // (always resize editor since both the centre split
                // and the sidebar split will affect it)
                editor.resize();

                event.preventDefault();
            }
        });
        $(document).mouseup(function() {
            isDragging = false;
            event.preventDefault();
        });

    });
});