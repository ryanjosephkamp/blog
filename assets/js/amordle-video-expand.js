/*
 * Gives the explainer video a working expand control.
 *
 * The browser's own fullscreen button is disabled whenever the page is inside an
 * iframe that was not granted fullscreen — which is the case in the draft
 * preview, where the button simply does nothing when pressed. On the published
 * page the native control works, so this does not replace it: it adds a second
 * control that asks for real fullscreen first and only falls back to filling the
 * viewport with CSS when the browser refuses.
 *
 * The fallback is a real fallback, not a lookalike: Escape closes it, focus goes
 * back where it came from, and the page behind it stops scrolling.
 */
(function () {
  'use strict';

  function ready() {
    var video = document.querySelector('.film-review__video');
    if (!video) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-expand';
    button.textContent = 'Expand video';
    button.setAttribute('aria-pressed', 'false');

    var expanded = false;
    var opener = null;

    function setExpanded(next) {
      expanded = next;
      video.classList.toggle('is-expanded', next);
      document.body.classList.toggle('has-expanded-video', next);
      button.setAttribute('aria-pressed', String(next));
      button.textContent = next ? 'Close video' : 'Expand video';
      if (!next && opener && opener.focus) {
        opener.focus();
        opener = null;
      }
    }

    button.addEventListener('click', function () {
      if (expanded) {
        setExpanded(false);
        return;
      }
      opener = document.activeElement;
      // Real fullscreen when the browser allows it.
      var request = video.requestFullscreen || video.webkitRequestFullscreen;
      if (document.fullscreenEnabled && request) {
        try {
          var result = request.call(video);
          if (result && typeof result.catch === 'function') {
            result.catch(function () {
              setExpanded(true);
            });
          }
          return;
        } catch (error) {
          /* Fall through to the CSS fallback. */
        }
      }
      setExpanded(true);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && expanded) setExpanded(false);
    });

    var transcript = document.querySelector('.film-review__transcript');
    if (transcript && transcript.parentNode) {
      transcript.parentNode.insertBefore(button, transcript);
    } else if (video.parentNode) {
      video.parentNode.appendChild(button);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
