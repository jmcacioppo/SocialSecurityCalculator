import $ from 'jquery';
import 'jquery-ui-dist';

export class benefits {
    attached () {
        var handle = $( "#custom-handle" );
        $('#benefitslider').slider({
            min: 0, 
            max: 10, 
            value: 2.5,
            step: 0.1,
            create: function() {
                handle.text( $( this ).slider( "value" ) );
            },
            slide: function( event, ui ) {
                handle.text(ui.value);
            }
        });

        $( "#cola" ).val( $( "#benefitslider" ).slider( "values", 0 ) +"%");
   }
}