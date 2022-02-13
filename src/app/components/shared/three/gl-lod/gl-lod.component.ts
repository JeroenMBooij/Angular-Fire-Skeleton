import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DARK_THEME_COLOR, ERROR_COLOR, LIGHT_THEME_COLOR, SUCCESS_COLOR } from 'src/app/common/constants/theme.constants';
import { ThemeService } from 'src/app/services/theme/theme.service';
import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { Lod } from './lod.model';


@Component({
  selector: 'gl-lod',
  templateUrl: './gl-lod.component.html',
  styleUrls: ['./gl-lod.component.scss']
})
export class GlLodComponent implements OnInit 
{
    @Input()
    set status(value: string)
    {
        if(this.lod)
        {
            this.lod.currentStatus = value;
            switch (value) {
                case 'SUCCESS':
                    this.lod.pointLight.color.setHex(SUCCESS_COLOR.replace('#', '0x'));
                    break;
                case 'INVALID':
                    this.lod.pointLight.color.setHex(ERROR_COLOR.replace('#', '0x'));
                    break;
                default:
                    this.lod.currentStatus = '';
                    this.handleLodTheme(this.lod.theme);
                    break;
            }
        }
    }

    @ViewChild('lodContainer') container: ElementRef

    private lod: Lod;
    


    constructor(private themeService: ThemeService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void 
    {
        this.initLod();
        (window as any).lod = this.lod;
        this.lod.animate();

        this.container.nativeElement.addEventListener('mouseleave', e => {
            this.lod.controls.rollSpeed = 0;
        });

        this.container.nativeElement.addEventListener('mouseenter', e => {
            this.lod.controls.rollSpeed = Math.PI / 24;
        });
        
        this.themeService.update.subscribe(theme => {
            this.handleLodTheme(theme);
        });
    }

    ngOnDestroy(): void
    {
        window.cancelAnimationFrame((window as any).requestAnimationId);
        delete (window as any).lod;
    }

    private initLod()
    {
        this.lod = new Lod();
        this.lod.clock = new THREE.Clock();

        this.lod.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);
        this.lod.camera.position.z = 1000;

        this.lod.scene = new THREE.Scene();
        this.lod.scene.fog = new THREE.Fog(0x000000, 1, 15000);

        this.lod.pointLight = new THREE.PointLight(0x03a9f4);
        this.lod.pointLight.position.set(0, 0, 0);
        this.lod.scene.add(this.lod.pointLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 0, 1).normalize();
        this.lod.scene.add(dirLight);

        const geometry: any[][] = [

            [ new THREE.IcosahedronGeometry( 100, 16 ), 50 ],
            [ new THREE.IcosahedronGeometry( 100, 8 ), 300 ],
            [ new THREE.IcosahedronGeometry( 100, 4 ), 1000 ],
            [ new THREE.IcosahedronGeometry( 100, 2 ), 2000 ],
            [ new THREE.IcosahedronGeometry( 100, 1 ), 8000 ]

        ];

        this.lod.material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } );

        for ( let j = 0; j < 1000; j ++ ) {

            const lod = new THREE.LOD();

            for ( let i = 0; i < geometry.length; i ++ ) {

                const mesh = new THREE.Mesh(geometry[i][0], this.lod.material);
                mesh.scale.set( 1.5, 1.5, 1.5 );
                mesh.updateMatrix();
                mesh.matrixAutoUpdate = false;
                lod.addLevel(mesh, geometry[ i ][ 1 ]);

            }

            lod.position.x = 10000 * (0.5 - Math.random());
            lod.position.y = 7500 * (0.5 - Math.random());
            lod.position.z = 10000 * (0.5 - Math.random());
            lod.updateMatrix();
            lod.matrixAutoUpdate = false;
            this.lod.scene.add(lod);

        }


        this.lod.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.lod.renderer.setPixelRatio(window.devicePixelRatio);
        this.lod.renderer.setSize( window.innerWidth, window.innerHeight);
        this.container.nativeElement.appendChild(this.lod.renderer.domElement);

        this.lod.controls = new FlyControls(this.lod.camera, this.lod.renderer.domElement);
        this.lod.controls.movementSpeed = 1000;

        window.addEventListener('resize', this.onWindowResize);
        
    }

    private onWindowResize() {

        this.lod.camera.aspect = window.innerWidth / window.innerHeight;
        this.lod.camera.updateProjectionMatrix();

        this.lod.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    private handleLodTheme(theme: string)
    {
        switch(theme)
        {
            case 'light-theme':
                if(this.lod.currentStatus == '')
                    this.lod.pointLight.color.setHex(LIGHT_THEME_COLOR.replace('#', '0x'));
                this.lod.material.color.set(0xa9afb8);
                this.lod.renderer.setClearColor(0xffffff);
                break;
            case 'dark-theme':
                if(this.lod.currentStatus == '')
                    this.lod.pointLight.color.setHex(DARK_THEME_COLOR.replace('#', '0x'));
                this.lod.material.color.set(0xffffff);
                this.lod.renderer.setClearColor(0x00000);
                break;
        }

        this.lod.theme = theme;
    }
}
