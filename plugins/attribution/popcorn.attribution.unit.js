test( "Popcorn attribution Plugin", function() {

  var popped = Popcorn( "#video" ),
      expects = 10,
      count = 0,
      setupId,
      attributiondiv = document.getElementById( "attribdiv" );

  expect( expects );

  function plus() {
    if ( ++count === expects ) {
      start();
    }
  }

  stop();

  ok( "attribution" in popped, "attribution is a method of the popped instance" );
  plus();

  equals( attributiondiv.childElementCount, 0, "initially, there is nothing inside the attributiondiv" );
  plus();

  popped.attribution({
      start: 0,
      end: 2,
      nameofwork: "A Shared Culture",
      copyrightholder: "Jesse Dylan",
      licenseurl: "http://creativecommons.org/licenses/by-nc/2.0/",
      target: "attribdiv"
    })
    .attribution({
      start: 2,
      end: 4,
      nameofwork: "Internet",
      nameofworkurl: "http://www.archive.org/details/CC1232_internet",
      copyrightholder: "The Computer Chronicles",
      license: "CC-BY-NC-ND",
      licenseurl: "http://creativecommons.org/licenses/by-nc-nd/2.0/",
      target: "attribdiv"
    })
    .volume( 0 );

  setupId = popped.getLastTrackEventId();

  popped.exec( 0, function() {
    equals( attributiondiv.childElementCount, 2, "attributiondiv now has two inner elements" );
    plus();
    equals( attributiondiv.children[ 0 ].style.display , "inline", "attribution is visible on the page" );
    plus();
  });

  popped.exec( 2, function() {

    ok( /target="_blank"/.test( attributiondiv.innerHTML ), "attributions create anchors that target=_blank" );
    plus();

    equals( attributiondiv.children[ 1 ].style.display, "inline", "second attribution is visible on the page" );
    plus();

    equals( typeof popped.data.trackEvents.byStart[ 1 ]._license, "undefined", "undefined license is properly being handled" );
    plus();
  });

  popped.exec( 4, function() {
    equals( attributiondiv.children[ 1 ].style.display, "none", "second attribution is no longer visible on the page" );
    plus();
    equals( attributiondiv.children[ 0 ].style.display, "none", "first attribution is no longer visible on the page" );
    plus();

    popped.pause().removeTrackEvent( setupId );
    ok( !attributiondiv.children[ 1 ], "removed attribution was properly destroyed" );
    plus();
  });

  popped.play();

});
