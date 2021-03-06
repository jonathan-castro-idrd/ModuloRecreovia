$(function(e)
{
	var URL = $('#main').data('url');
	var latitud = parseFloat($('input[id="latitud"]').val());
	var longitud = parseFloat($('input[id="longitud"]').val());
	var zoom = 13;

	var map = new google.maps.Map($("#map").get(0), {
		center: {lat: latitud, lng: longitud},
		zoom: zoom
	});

	var marker = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: {lat: latitud, lng: longitud}
	});

	var cargarObjetivoGeneral = function()
	{
		var objetivo = $('select[name="Objetivo_General"]').val();
		var definicion = 'Seleccionar tipo un tipo de sesión';

		switch(objetivo)
		{
			case 'Gimnasia de Mantenimiento (GM)':
				definicion = 'Facilitar el proceso de adaptación de los usuarios principalmente sedentarios, adultos y personas mayores, a un adecuado manejo de la Actividad Física estructurada y musicalizada, por medio de herramientas lúdicas, dinámicas, jugadas y motivadoras, que le permitan reforzar su Psicomotricidad, cualidades físicas y demás aspectos motores.';
			break;
			case 'Estimulación Muscular (EM)':
				definicion = 'Orientar a los usuarios en la forma de estimular los diferentes músculos del cuerpo por medio de la aplicación de ejercicios, de métodos y formas para el desarrollo de la fuerza.';
			break;
			case 'Movilidad Articular (MA)':
				definicion = 'Ampliar progresivamente los rangos de movimiento articular en los usuarios, utilizando diferentes movimientos y métodos de flexibilidad, que permitan el estímulo a los componentes articulares, generando relajación muscular, conciencia corporal y bienestar en cada una de las posibilidades de movimiento.';
			break;
			case 'Rumba Tropical Folclorica (RTF)':
				definicion = 'Estimular el sistema cardiovascular mediante una intensidad moderada y un poco fuerte, utilizando diferentes ritmos afro latinos, folclor nacional e internacional, urbanos, y todo género musical que se pueda adaptar a la sesión.';
			break;
			case 'Actividad Rítmica para Niños (ARN) Rumba para Niños':
				definicion = 'Propender el desarrollo de la motricidad y capacidades coordinativas mediante la práctica de la Actividad Física, generando en el niño la socialización y acercamiento con sus padres a través de técnicas lúdicas que permita fomentar buenos hábitos de vida saludable.';
			break;
			case 'Gimnasia Aeróbica Musicalizada (GAM)':
				definicion = 'Estimular el sistema cardio-pulmonar mediante la práctica de una serie de estructuras coreográficas a una intensidad moderada, utilizando la métrica musical y los diferentes métodos inherentes a la sesión de gimnasia aeróbica musicalizada, contribuyendo en la mejora de la resistencia cardio-vascular de los participantes.';
			break;
			case 'Artes Marciales Musicalizadas (AMM)':
				definicion = 'Estimular el sistema cardiovascular, segmentos musculares y articulares por medio de la aplicación de un esfuerzo progresivo, aplicando movimientos básicos de las artes marciales, de manera continua estimulando la tonicidad muscular por medio de repeticiones.';
			break;
			case 'Gimnasia Psicofísica (GPF)':
				definicion = 'Lograr un estado superior de conciencia en donde prime la paz y la tranquilidad, combinando diferentes técnicas de estimulación, por medio del aprendizaje y práctica consciente de movimientos y ejercicios guiados que les permitan a los usuarios calmar y disminuir los índices de stress y alteraciones psicosomáticas.';
			break;
			case 'Pilates (Pil)':
				definicion = 'Permitir que los habitantes de Bogotá, practiquen el Método Pilates, de forma permanente en los Puntos de Actividad Física de RECREOVÍA, brindando la oportunidad en igualdad de condiciones a los diferentes grupos poblacionales, generando e inculcando en los participantes Hábitos y Estilos de Vida Saludable.';
			break;
			case 'Taller de Danzas (TD)':
				definicion = 'Enseñar de forma teórica y práctica los pasos propios de la danza, teniendo en cuenta las recomendaciones técnicas y las modificaciones pertinentes de la población, el espacio y las temáticas a desarrollar.'
			break;
			case 'Gimnasio Saludable al Aire Libre (GSAL)':
				definicion = 'Proponer formas adecuadas de desarrollar la actividad física dirigida, a partir del acompañamiento de profesionales de la actividad física, en los espacios de gimnasios saludables, permitiendo que los usuarios conozcan la funcionalidad de cada uno de los elementos y su correcta utilización, previniendo así las posibles lesiones mientras se lucha con el flagelo del sedentarismo.';
			break;
		}

		$('#detalle_objetivo_general').text(definicion);
	}

	var refrescar_acompanantes = function()
	{
		var acompanantes = $('select[name="Acompanantes[]"]').attr('data-value');
		if (acompanantes)
		{
			$('select[name="Acompanantes[]"]').selectpicker('val', acompanantes.split(','));
			$('select[name="Acompanantes[]"]').selectpicker('refresh');
        }
	}

	$('#sesiones').DataTable({
		responsive: true,
		columnDefs: [
			{
				targets: 'no-sort',
				orderable: false
			},
			{
				targets: 7,
        		searchable: false,
        		orderable: false
        	}
      	]
	});

	$('input[name^="Requisito_"], input[name="Puntualidad_PAF"], input[name="Tiempo_De_La_Sesion"], input[name="Escenario_Y_Montaje"], input[name="Cumplimiento_Del_Objetivo"], input[name="Variedad_Y_Creatividad"], input[name="Imagen_Institucional"], input[name="Divulgacion"], input[name="Seguridad"]').on('click', function(e)
	{
		var checkbox = $(this);
		var name = $(this).prop('name');
		$('input[name="'+name+'"]').each(function(i, e)
		{
			if (!checkbox.is($(e)))
				$(e).prop('checked', false);
		});
	});

	$('select[name="Acompanantes[]"]').selectpicker();

	$('select[name="Objetivo_General"]').on('changed.bs.select', function(e)
	{
		cargarObjetivoGeneral();
	});

	$('#verificar-disponibilidad').on('click', function(e)
	{
		var fecha = $('input[name="Fecha"]').val();
		var inicio = $('input[name="Inicio"]').val();
		var fin = $('input[name="Fin"]').val();
		var profesor_asignado = $('select[name="Id_Recreopersona"]').data('value');
		var acompanantes_asignados = $('select[name="Acompanantes[]"]').data('value')+'';

		if (fecha != '' && inicio != '' && fin != '')
		{
			var profesores = [];
			$('select[name="Id_Recreopersona"] option').each(function(i, e)
			{
				$(e).removeAttr('disabled');
				if($.inArray($(e).attr('value'), profesores) < 0 && $(e).attr('value') != '')
					profesores.push($(e).attr('value'));
			});

			$('select[name="Acompanantes[]"] option').each(function(i, e)
			{
				$(e).removeAttr('disabled');
				if($.inArray($(e).attr('value'), profesores) < 0 && $(e).attr('value') != '')
					profesores.push($(e).attr('value'));
			});

			$.post(
				URL+'/disponibilidad',
				{
					fecha: fecha,
					inicio: inicio,
					fin: fin,
					profesores: profesores
				},
				function(data)
				{
					if(data)
					{
						var profesores_disponibles = [];
						var acompanantes_asignados_array = acompanantes_asignados.split(',');
						console.log(acompanantes_asignados_array);

						$.each(data, function(i, e)
						{
							profesores_disponibles.push(e);
						});

						$('select[name="Id_Recreopersona"] option').each(function(i, e)
						{
							if ($.inArray($(e).attr('value'), profesores_disponibles) < 0)
							{
								if ($(e).attr('value') != profesor_asignado && $.inArray($(e).attr('value'), acompanantes_asignados_array) < 0)
									$(e).attr('disabled', 'disabled');
							}
						});

						$('select[name="Acompanantes[]"] option').each(function(i, e)
						{
							if ($.inArray($(e).attr('value'), profesores_disponibles) < 0)
							{
								if ($(e).attr('value') != profesor_asignado && $.inArray($(e).attr('value'), acompanantes_asignados_array) < 0)
									$(e).attr('disabled', 'disabled');
							}
						});
					}
				},
				'json'
			).done(function(){
				$('select[name="Id_Recreopersona"]').selectpicker('render');
				$('select[name="Acompanantes[]"]').selectpicker('render');

				console.log('render');
			});
		}

		$('input[name="Fecha"]').closest('.form-group').removeClass('has-error');
		$('input[name="Inicio"]').closest('.form-group').removeClass('has-error');
		$('input[name="Fin"]').closest('.form-group').removeClass('has-error');

		if (fecha == '') $('input[name="Fecha"]').closest('.form-group').addClass('has-error');
		if (inicio == '') $('input[name="Inicio"]').closest('.form-group').addClass('has-error');
		if (fin == '') $('input[name="Fin"]').closest('.form-group').addClass('has-error');
	});

	$('input[data-number]').on('focus', function(e)
	{
		$(this).select();
	});

	if ($('select[name="Objetivo_General"]').attr('data-value') != '')
		cargarObjetivoGeneral();

	if ($('select[name="Acompanantes[]"]').attr('data-value') != '')
		refrescar_acompanantes();
});
