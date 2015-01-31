/*

  LDraw Units, since we might want to import from at some point...  

  width/depth = 20 LDU
  1 brick height = 24 LDU
  1 plate height = 8 LDU
  1 round diameter = 12 LDU
  1 round height = 4 LDU

*/

var BRICK={};

//Brick colour mapper, uses LDraw colour standard TODO:full list

BRICK.color=function(val){
    //=default to 7/grey
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
        'black':0,
        'blue':1,
        'green':2,
        'grey':7,
        'white':15
    }
    return map[string];
}

//round

BRICK.round=function(colorCode, height){
	
this.prototype = Object.create(THREE.Object3D.prototype);
	
	height=height || 4

    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var edgeMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).edge});
    
    this.add(getMesh(4, 6, height+2));
    this.add(getMesh(height, 10, 4));
    this.add(getMesh(2, 8, 2));
    
    function getMesh(height, dia, y){
        var mesh=new THREE.Mesh(new THREE.CylinderGeometry(dia, dia, height, 32, height), faceMaterial);
        
        mesh.position.y=y+(height/2);
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        return mesh;
    }

}

BRICK.round.prototype.constructor = BRICK.round;

//Cone

BRICK.cone=function(colorCode, height){
    THREE.Object3D.call( this );
    	
    height=height || 24
    
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var mesh=new THREE.Mesh(new THREE.CylinderGeometry(6, 10, height, 32, height), faceMaterial);
    
    var mesh2=new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 2, 32, 2), faceMaterial);
    mesh2.position.y=height/2+1;
    
    var mesh3=new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 2, 32, 2), faceMaterial);
    mesh3.position.y=-(height/2+1);
    this.add(mesh3);    
    this.add(mesh2);
    this.add(mesh);
    
}

BRICK.cone.prototype = new THREE.Object3D();
BRICK.cone.prototype.constructor = BRICK.cone;

//Basic flat plate

BRICK.plate=function(colorCode, w, d){
    w = w || 1;
    d = d || 1;
    
    THREE.Object3D.call( this );
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(20*w,8,20*d), faceMaterial);
    mesh.position.y=4;
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

//Basic modified plate class

BRICK.modSquare=function(colorCode){
    
    THREE.Object3D.call( this );
    this.faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});

}

BRICK.modSquare.prototype = Object.create(THREE.Object3D.prototype);
BRICK.modSquare.prototype.constructor = BRICK.modSquare;

BRICK.modSquare.prototype.getStud=function(height, dia, y){
    var mesh=new THREE.Mesh(new THREE.CylinderGeometry(dia, dia, height, 32, height), this.faceMaterial);
    
    mesh.position.y=y+(height/2);
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    return mesh;
}


BRICK.headlight=function(colorCode){
    this.prototype = Object.create(BRICK.modSquare);
    
    
     this.faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    //main
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(16,24,20), this.faceMaterial);
    mesh.position.y=(24)/2;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);
    //lip
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(4,4,20), this.faceMaterial);
    mesh.position.y=2;
    mesh.position.x=16/2+2
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);  
    //to stud
    this.add(this.getStud(4, 6, 20+4));
    //side stud
    var rot=this.getStud(4,6,10);
    rot.rotation.x=90 * ( Math.PI / 180 );
    rot.rotation.z=90 * ( Math.PI / 180 );
    rot.position.x=16/2+4;
    rot.position.y=13; 
    rot.updateMatrix();
    this.add(rot);

}

BRICK.headlight.prototype = new BRICK.modSquare();
BRICK.headlight.prototype.constructor = BRICK.headlight;

BRICK.fourway=function(colorCode){
    THREE.Object3D.call( this );  
    this.faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    //main
    var mesh=new THREE.Mesh(new THREE.CubeGeometry(20,24,20), this.faceMaterial);
    mesh.position.y=(24)/2;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.add(mesh);
    //top stud
    this.add(this.getStud(4, 6, 20+4));
    //side studs TODO need to be hollow not solid
    var posx=[0,12,0,-12]
    var posz=[12,0,-12,0]
    for (var i=0; i<4; i++){
        var rot=this.getStud(4,6,10);
        rot.rotation.x=90 * ( Math.PI / 180 );
        rot.rotation.z=i*90 * ( Math.PI / 180 );
        rot.position.x=posx[i];
        rot.position.z=posz[i];
        rot.position.y=13; 
        rot.updateMatrix();
        this.add(rot);
    }
}

BRICK.fourway.prototype = new BRICK.modSquare();
BRICK.fourway.prototype.constructor = BRICK.fourway;

BRICK.tap=function(colorCode){
    THREE.Object3D.call( this );
    var faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face}); 
    
    //base
    
    var stud=new THREE.Mesh(new THREE.CylinderGeometry(8,8, 4, 32, 4), faceMaterial);    
    stud.matrixAutoUpdate = false;
    stud.updateMatrix();
    this.add(stud);
    
    //indent
    
    var ind=new THREE.Mesh(new THREE.CylinderGeometry(6,8, 4, 32, 2), faceMaterial);
    ind.position.y=4;     
    ind.matrixAutoUpdate = false;
    ind.updateMatrix();
    this.add(ind);
    
    //main
    var main=new THREE.Mesh(new THREE.CylinderGeometry(4,4, 22, 32, 2), faceMaterial);
    main.position.y=10;
    main.matrixAutoUpdate = false;
    main.updateMatrix();
    this.add(main);  
    
    //top
   var top=new THREE.Mesh(new THREE.CylinderGeometry(6,6, 4, 32, 2), faceMaterial);
   top.position.y=22;
   top.matrixAutoUpdate = false;
   top.updateMatrix();
   this.add(top); 
   
   var hose1  = new THREE.Mesh(new THREE.CylinderGeometry(3,3, 7, 32, 2), faceMaterial);
   hose1.rotation.z=90 * ( Math.PI / 180 );
   hose1.position.y=17;
   hose1.position.x=-6;
   this.add(hose1); 
   
    var hose2  = new THREE.Mesh(new THREE.CylinderGeometry(2,3, 3, 32, 2), faceMaterial);
    hose2.rotation.z=90 * ( Math.PI / 180 );
    hose2.position.y=17;
    hose2.position.x=-11;
    this.add(hose2);   
    
    var hose3  = new THREE.Mesh(new THREE.CylinderGeometry(3,3, 2, 32, 2), faceMaterial);
    hose3.rotation.z=90 * ( Math.PI / 180 );
    hose3.position.y=17;
    hose3.position.x=-14;
    this.add(hose3);  
    
}

BRICK.tap.prototype = new THREE.Object3D();
BRICK.tap.prototype.constructor = BRICK.tap;

BRICK.miniSlope=function(colorCode){
    THREE.Object3D.call( this );  
    this.faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    var extrudeSettings = { amount: 20, bevelEnabled: false, steps: 4, material: 0, extrudeMaterial: 1 };
    
    var side = new THREE.Shape();
    side.moveTo(  0, 0 );
    side.lineTo(  20, 0 );
    side.lineTo( 20, 4 );
    side.lineTo( 0, 14 );
    side.lineTo(0,0);
    

    var geo = side.extrude( extrudeSettings );
	geo.computeVertexNormals();

	THREE.GeometryUtils.center( geo );
	var mesh=new THREE.Mesh( geo, this.faceMaterial );
	mesh.position.y=7;
	mesh.matrixAutoUpdate = false;
	mesh.updateMatrix();
	this.add(mesh);
}
BRICK.miniSlope.prototype = new THREE.Object3D();
BRICK.miniSlope.prototype.constructor = BRICK.miniSlope;


BRICK.clip=function(colorCode){
    THREE.Object3D.call( this );  
    this.faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    this.add(new BRICK.square(colorCode, 1, 1, 1));
    
    var extrudeSettings = { amount: 8, bevelEnabled: false, steps: 1, material: 0, extrudeMaterial: 0 };
    
    var clip = new THREE.Shape();
    
    clip.moveTo(3.696,-21.531)
    clip.lineTo(-3.696,-21.531 );      
    clip.lineTo(-3.696, -24 );      
    clip.lineTo( -7.584, -24);      
    clip.lineTo( -7.584, -19);    
    clip.lineTo(  -7.199, -17.5 );
    clip.lineTo(  -6.5, -16 );
    clip.lineTo(  -5.40, -14.5 );
    clip.lineTo(  -4.75, -13 ); 
    clip.lineTo( -4.75, -10);   
    clip.lineTo( 4.75, -10);
    clip.lineTo( 4.75, -13);
    clip.lineTo( 5.40, -14.5);
    clip.lineTo( 6.5, -16);
    clip.lineTo( 7.199, -17.5);
    clip.lineTo(7.584, -19 );
    clip.lineTo( 7.584, -24);
    clip.lineTo(3.696,-24 );    
    clip.lineTo(4,-19)
    clip.lineTo( 3.696, -17.5);
    clip.lineTo( 0, -16);    
    clip.lineTo( -3.696, -17.5);
    clip.lineTo(-4,-19)
    
       
    
    
    var geo = clip.extrude( extrudeSettings );
    geo.computeVertexNormals();
    
    THREE.GeometryUtils.center( geo );
    var mesh=new THREE.Mesh( geo, this.faceMaterial );
    mesh.matrixAutoUpdate = false;
    mesh.rotation.x=90 * ( Math.PI / 180 );
    mesh.rotation.z=90 * ( Math.PI / 180 );
    
    mesh.position.y=4;
    mesh.position.x=16;
    mesh.updateMatrix();
    this.add(mesh);   

}

BRICK.clip.prototype = new THREE.Object3D();
BRICK.clip.prototype.constructor = BRICK.clip;

BRICK.tpiece=function(colorCode){
    THREE.Object3D.call( this );  
    faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    var pipe=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5, 22, 32, 4), faceMaterial);
    pipe.position.y=12;
    pipe.matrixAutoUpdate = false;
    pipe.updateMatrix();
    this.add(pipe);
    
    var pipeend=new THREE.Mesh(new THREE.CylinderGeometry(2,2.5, 1, 32, 4), faceMaterial);
    pipeend.position.y=23;
    pipeend.matrixAutoUpdate = false;
    pipeend.updateMatrix();
    this.add(pipeend);
    
    var pipeend2=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2, 1, 32, 4), faceMaterial);
    pipeend2.position.y=2;
    pipeend2.matrixAutoUpdate = false;
    pipeend2.updateMatrix();
    this.add(pipeend2);
    
    var pipe2=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5, 7, 32, 4), faceMaterial);
    
    pipe2.rotation.x=90 * ( Math.PI / 180 );
    pipe2.position.z=6;
    pipe2.position.y=12;
    pipe2.matrixAutoUpdate = false;
    pipe2.updateMatrix();
    
    this.add(pipe2);
    
    var pipeend3=new THREE.Mesh(new THREE.CylinderGeometry(2,2.5, 1, 32, 4), faceMaterial);
    pipeend3.rotation.x=90 * ( Math.PI / 180 );
    pipeend3.position.z=10;
    pipeend3.position.y=12;
    pipeend3.matrixAutoUpdate = false;
    pipeend3.updateMatrix();
    this.add(pipeend3);
    
    var sph=new THREE.Mesh(new THREE.SphereGeometry(4.2, 12, 12), faceMaterial);
    sph.position.y=12;
    sph.matrixAutoUpdate = false;
    sph.updateMatrix();
    this.add(sph);
    
}

BRICK.tpiece.prototype = new THREE.Object3D();
BRICK.tpiece.prototype.constructor = BRICK.tpiece;

BRICK.topclip=function(colorCode){
    THREE.Object3D.call( this );
    faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    this.add(new BRICK.plate(colorCode))
    
    var extrudeSettings = { amount: 6, bevelEnabled: false, steps: 1, material: 0, extrudeMaterial: 0 };
    var clip = new THREE.Shape();
    
    clip.moveTo(10,0)
    clip.lineTo(8,10);
    clip.lineTo(4,10);
    clip.lineTo(4,2);
    clip.lineTo(2,1);
    clip.lineTo(1,1);
    clip.lineTo(-2,1);
    clip.lineTo(-4,2);
    clip.lineTo(-4,10);
    clip.lineTo(-8,10);
    clip.lineTo(-10,0)
    clip.lineTo(10,0)
    
    var geo = clip.extrude( extrudeSettings );
    geo.computeVertexNormals();
    
    THREE.GeometryUtils.center( geo );
    var mesh=new THREE.Mesh( geo, faceMaterial );
    mesh.matrixAutoUpdate = false;  
    mesh.position.y=12;
    mesh.updateMatrix();
    this.add(mesh);   
      
}

BRICK.topclip.prototype = new THREE.Object3D();
BRICK.topclip.prototype.constructor = BRICK.topclip;

BRICK.hinge=function(colorCode){
    
    THREE.Object3D.call( this );
    faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    var part1=new BRICK.square(colorCode, 1,2,1);
    part1.rotation.y=135 * ( Math.PI / 180 );
    part1.position.z=23;
    part1.position.x=-15;
    part1.updateMatrix();
    
    var part2=new BRICK.square(colorCode, 1,2,1);
    part2.position.z=-22;
    
    this.add(part1);
    this.add(part2)
    
    var hinge=new THREE.Mesh(new THREE.CylinderGeometry(8,8, 8, 32, 4), faceMaterial);
    hinge.position.x=-10;
    hinge.position.y=4;
    
    this.add(hinge);
    
    
}
BRICK.hinge.prototype = new THREE.Object3D();
BRICK.hinge.prototype.constructor = BRICK.hinge;

BRICK.hingepart=function(colorCode){
    
    THREE.Object3D.call( this );
    faceMaterial = new THREE.MeshLambertMaterial({color: BRICK.color(colorCode).face});
    
    var part1=new BRICK.square(colorCode, 1,2,1);
    
    this.add(part1);
    
    var hinge=new THREE.Mesh(new THREE.CylinderGeometry(5,5, 4, 32, 4), faceMaterial);
    hinge.position.x=-8;
    hinge.position.y=4;    
    hinge.rotation.z=90 * ( Math.PI / 180 );
    hinge.position.z=22;
    this.add(hinge);
    
    var hinge2=new THREE.Mesh(new THREE.CylinderGeometry(5,5, 4, 32, 4), faceMaterial);
    hinge2.position.x=8;
    hinge2.position.y=4;
    hinge2.position.z=22;
    hinge2.rotation.z=90 * ( Math.PI / 180 );
    
    this.add(hinge2);
    
    
}
BRICK.hingepart.prototype = new THREE.Object3D();
BRICK.hingepart.prototype.constructor = BRICK.hingepart;

