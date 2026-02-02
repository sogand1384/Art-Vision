(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		settings = {

			// Keyboard shortcuts.
				keyboardShortcuts: {
						enabled: true,
						distance: 50
				},

			// Scroll wheel.
				scrollWheel: {
						enabled: true,
						factor: 1
				},

			// Scroll zones.
				scrollZones: {
						enabled: true,
						speed: 15
				}

		};

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ '481px',   '736px'  ],
		xsmall:  [ null,      '480px'  ],
	});

	// Mobile fixes
	if (browser.mobile) {
		settings.keyboardShortcuts.enabled = false;
		settings.scrollWheel.enabled = false;
		settings.scrollZones.enabled = false;
		$main.css('overflow-x', 'auto');
	}

	if (browser.name == 'ie')
		$wrapper.css('height', '100vh');

	if (browser.os == 'ios')
		$wrapper.css('min-height', 'calc(100vh - 30px)');

	$window.on('load', function() {
		setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Random delay for thumbs
	$('.item.thumb').each(function() {
		$(this).addClass('delay-' + Math.floor((Math.random() * 6) + 1));
	});

	if (browser.name == 'ie')
		$('.item.thumb').each(function() {
			var $this = $(this),
				$img = $this.find('img');

			$this
				.css('background-image', 'url(' + $img.attr('src') + ')')
				.css('background-size', 'cover')
				.css('background-position', 'center');

			$img.css('opacity', '0');
		});

	// Poptrox
	$main.poptrox({
		onPopupOpen: function() { $body.addClass('is-poptrox-visible'); },
		onPopupClose: function() { $body.removeClass('is-poptrox-visible'); },
		overlayColor: '#1a1f2c',
		overlayOpacity: 0.75,
		popupCloserText: '',
		popupLoaderText: '',
		selector: '.item.thumb a.image',
		caption: function($a) {
			return $a.prev('h2').html();
		},
		usePopupDefaultStyling: false,
		usePopupCloser: false,
		usePopupCaption: true,
		usePopupNav: true,
		windowMargin: 50
	});

	breakpoints.on('>small', function() {
		$main[0]._poptrox.windowMargin = 50;
	});

	breakpoints.on('<=small', function() {
		$main[0]._poptrox.windowMargin = 0;
	});

	// Keyboard shortcuts
	if (settings.keyboardShortcuts.enabled)
		$window.on('keydown', function(event) {

			if ($body.hasClass('is-poptrox-visible'))
				return;

			var scrolled = false;

			switch (event.keyCode) {
				case 37:
					$main.scrollLeft($main.scrollLeft() - settings.keyboardShortcuts.distance);
					scrolled = true;
					break;
				case 39:
					$main.scrollLeft($main.scrollLeft() + settings.keyboardShortcuts.distance);
					scrolled = true;
					break;
				case 33:
					$main.scrollLeft($main.scrollLeft() - $window.width() + 100);
					scrolled = true;
					break;
				case 34:
				case 32:
					$main.scrollLeft($main.scrollLeft() + $window.width() - 100);
					scrolled = true;
					break;
				case 36:
					$main.scrollLeft(0);
					scrolled = true;
					break;
				case 35:
					$main.scrollLeft($main.width());
					scrolled = true;
					break;
			}

			if (scrolled) {
				event.preventDefault();
				event.stopPropagation();
				$main.stop();
			}
		});

	// ==============================
	// 🔄 REVERSED SCROLL WHEEL
	// ==============================
	if (settings.scrollWheel.enabled)
		(function() {

			var normalizeWheel = function(event) {

				var sY = 0, pY = 0;

				if ('wheelDelta' in event)
					sY = event.wheelDelta / -120;
				else if ('deltaY' in event)
					sY = event.deltaY > 0 ? 1 : -1;

				pY = event.deltaY || sY * 10;

				return {
					pixelY: pY
				};
			};

			$body.on('wheel', function(event) {

				if (breakpoints.active('<=small'))
					return;

				event.preventDefault();
				event.stopPropagation();

				$main.stop();

				var n = normalizeWheel(event.originalEvent),
					y = n.pixelY,
					delta = Math.min(Math.abs(y), 150) * settings.scrollWheel.factor,
					direction = y > 0 ? -1 : 1; // ↓ = چپ | ↑ = راست

				$main.scrollLeft($main.scrollLeft() + (delta * direction));
			});

		})();

	// Scroll zones (unchanged)
	if (settings.scrollZones.enabled)
		(function() {

			var $left = $('<div class="scrollZone left"></div>'),
				$right = $('<div class="scrollZone right"></div>'),
				paused = false,
				intervalId = null,
				direction;

			function activate(d) {
				if (breakpoints.active('<=small') || paused)
					return;

				$main.stop();
				direction = d;

				clearInterval(intervalId);
				intervalId = setInterval(function() {
					$main.scrollLeft($main.scrollLeft() + (settings.scrollZones.speed * direction));
				}, 25);
			}

			function deactivate() {
				paused = false;
				clearInterval(intervalId);
			}

			$left.appendTo($wrapper).css('left', 0).on('mouseenter', function() {
				activate(-1);
			});

			$right.appendTo($wrapper).css('right', 0).on('mouseenter', function() {
				activate(1);
			});

			$('.scrollZone').on('mouseleave mousedown', deactivate);

			$body.on('---pauseScrollZone', function() {
				paused = true;
				setTimeout(function() {
					paused = false;
				}, 500);
			});

		})();

})(jQuery);
