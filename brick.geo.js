/*

  LDraw Units, since we might want to import from at some point...  

  width/depth = 20 LDU
  1 brick height = 24 LDU
  1 plate height = 8 LDU
  1 round diameter = 12 LDU
  1 round height = 4 LDU

*/

var BRICK={};

//Brick colour mapper, uses LDraw colour standard

BRICK.color=function(val){
    //=default to 7
    val= val || 7;
    
    var codes={
        0:{face:0x05131D, edge:0x595959},
        7:{face:0x9BA19D,edge:0x333333},
        15:{face:0xFFFFFF, edge:0x333333},
        1:{face:0x0055BF, edge:0x333333},
        2:{face:0x257A3E, edge:0x333333}	
    }
    return codes[val];
}

BRICK.colorCode=function(string){
    string=string.toLower();
    var map={
        'grey':7,
        'black':0,
        'white':15,
        'blue':1,
        'green':2
    }
}

//round

BRICK.round=function(colorCode, height){
	
	THREE.Object3D.call( this );
	
	height=height || 4

    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var edgeMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).edge});
    
    this.add(getMesh(4, 8, height+4));
    this.add(getMesh(height, 12, 4));
    this.add(getMesh(2, 10, 0));
    
    function getMesh(height, dia, y){
        var mesh=new THREE.Mesh(new THREE.CylinderGeometry(dia, dia, height, 32, height), faceMaterial);
        
        mesh.position.y=y+(height/2);
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        return mesh;
    }

}

BRICK.round.prototype = new THREE.Object3D();
BRICK.round.prototype.constructor = BRICK.round;

BRICK.plate=function(colorCode, w, d){
    w = w || 1;
    d = d || 1;
    
    THREE.Object3D.call( this );
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(20*w,8,20*d), faceMaterial);
    mesh.position.y=(8*h)/2;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);

}

BRICK.plate.prototype = new THREE.Object3D();
BRICK.plate.prototype.constructor = BRICK.plate;

/* 
Create a new Brick. Takes width/depth in studs and height in plates
*/

BRICK.square=function(colorCode, w, d, h){
    w = w || 1;
    h = h || 3;
    d = d || 1;
    
    THREE.Object3D.call( this );
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(20*w,8*h,20*d), faceMaterial);
    mesh.position.y=(8*h)/2;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);
    
    for(var i=1; i<=w; i++){
        for(var j=1; j<=d; j++){
            var stud=new THREE.Mesh(new THREE.CylinderGeometry(6,6, 4, 32, 4), faceMaterial);
            stud.position.y=(8*h)+2;
            stud.position.x=(i*20)-((w*20)/2)-10;
            stud.position.z=(j*20)-((d*20)/2)-10;
            
            stud.matrixAutoUpdate = false;
            stud.updateMatrix();
            
            this.add(stud);
        }
    }
    
}

BRICK.square.prototype = new THREE.Object3D();
BRICK.square.prototype.constructor = BRICK.square;

BRICK.headlight=function(colorCode){
    THREE.Object3D.call( this );
    
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(16,24,20), faceMaterial);
    mesh.position.y=(24)/2;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);
    
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(4,4,20), faceMaterial);
    mesh.position.y=2;
    mesh.position.x=16/2+2
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);  
    this.add(getStud(4, 6, 20+4));
    
    var rot=getStud(4,6,10);
    
    rot.rotation.x=90 * ( Math.PI / 180 );
    rot.rotation.z=90 * ( Math.PI / 180 );
    rot.position.x=16/2+2;
    rot.position.y=13; 
    rot.matrixAutoUpdate = false;
    rot.updateMatrix();
    this.add(rot);
    
    
    function getStud(height, dia, y){
        var mesh=new THREE.Mesh(new THREE.CylinderGeometry(dia, dia, height, 32, height), faceMaterial);
        
        mesh.position.y=y+(height/2);
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        return mesh;
    }
      

}

BRICK.headlight.prototype = new THREE.Object3D();
BRICK.headlight.prototype.constructor = BRICK.headlight;
