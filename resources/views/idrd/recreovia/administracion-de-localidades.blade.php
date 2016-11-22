<div class="content">
    <div id="main" class="row">
        <div id="alerta" class="col-xs-12" style="display:none;">
            <div class="alert alert-success alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                Datos actualizados satisfactoriamente.
            </div>                                
        </div>
        <div class="col-xs-12">Selecciona una localidad</div>
        <div class="col-xs-12"><br></div>
        <div class="col-xs-12">
            <div class="row">
    
                @foreach($localidades as $localidad)
                    <div class="col-md-4">
                        <div class="squad-grid">
                            <a href="{{ url('localidades/administrar/'.$localidad['Id_Localidad']) }}" class="btn-link">
                                {{ $localidad['Localidad'] }}
                            </a>
                            <p class="list-group-item-text">
                                <small>Puntos: {{ count($localidad->puntos) }} Gestores: {{ count($localidad->recreopersonas()->where('Tipo', 'Gestor')->get()) }} Profesores: {{ count($localidad->recreopersonas()->where('Tipo', 'Profesor')->get()) }}</small>
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>