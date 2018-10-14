/**
 *
 * @returns {HTMLCanvasElement}
 */
getCanvas = function () {
    return document.getElementById("planché")
};

function init() {
    resize();
    init.objects = [];

    init.particle = function () {
        this.x = Math.random() * getCanvas().width;
        this.y = Math.random() * getCanvas().height;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
    };

    for (var i = 0; i < 10000; i++) {
        init.objects.push(new init.particle());
    }

    setInterval(
        function handle() {
            this.handleMovement = function () {
                init.objects.forEach(function (particle) {
                    var move = function (x, dx, limit) {
                        var xx = dx + x;

                        if (xx < 0.0) {
                            return move(xx + limit, 0);
                        }

                        if (xx > limit) {
                            return move(xx - limit, 0);
                        }
                        return xx;
                    };

                    particle.x = move(particle.x, particle.dx, getCanvas().width);
                    particle.y = move(particle.y, particle.dy, getCanvas().height);
                });
            }();

            this.handleDraw = function () {
                var canvas = getCanvas();
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                init.objects.forEach(function (particle) {
                    ctx.fillRect(particle.x, particle.y, 1, 1);
                });
            }();

        }
        , 10);

}

function resize(){
    getCanvas().width = window.innerWidth;
    getCanvas().height = window.innerHeight;
}
