import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DARK_THEME_PRIMARY_COLOR, LIGHT_THEME_PRIMARY_COLOR } from 'src/app/common/constants/theme.constants';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Robot } from './robot.model';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { ROBOT_EMOTES, ROBOT_IDLE_STATE, ROBOT_STATES } from 'src/app/common/constants/robot.constants';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit 
{

    @Input()
    set state(value: string)
    {
        if(this.robot)
            if(value)
                this.robot.fadeToAction(value, 0.2);
        else
            this.initialState = value;
    }

    @Input()
    set emote(value: string)
    {
        if(this.robot)
            if(value)
                this.robot.executeEmote(value);
        else
            this.initialEmote = value;
    }

    @ViewChild('robotContainer') container: ElementRef

    
    private robot: Robot;
    private initialState: string;
    private initialEmote: string;

    
    constructor(private themeService: ThemeService) 
    {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void 
    {
        this.initRobot();
        (window as any).robot = this.robot;
        this.robot.animate();
    }

    ngOnDestroy(): void
    {
        window.cancelAnimationFrame((window as any).requestAnimationId);
        delete (window as any).robot;

    }

    private initRobot(): void
    {
        this.robot = new Robot();
        this.robot.camera = new THREE.PerspectiveCamera(30, this.container.nativeElement.clientWidth / this.container.nativeElement.clientHeight);
        this.robot.camera.position.set(-15, 5, 10);

        this.robot.camera.lookAt(new THREE.Vector3(16, 3, -10));

        this.robot.scene = new THREE.Scene();
        this.robot.scene.background = new THREE.Color(Number(LIGHT_THEME_PRIMARY_COLOR.replace('#', '0x')));
        this.themeService.update.subscribe(theme => {
            switch(theme)
            {
                case 'light-theme':
                    this.robot.scene.background = new THREE.Color(Number(LIGHT_THEME_PRIMARY_COLOR.replace('#', '0x')));
                    break;

                case 'dark-theme':
                    this.robot.scene.background = new THREE.Color(Number(DARK_THEME_PRIMARY_COLOR.replace('#', '0x')));
                    break;
            }
        });

        this.robot.clock = new THREE.Clock();

        // lights

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 20, 0);
        this.robot.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 20, 10);
        this.robot.scene.add(dirLight);

        const loader = new GLTFLoader();
        loader.load('../../../../../assets/gltf/RobotExpressive.glb', (gltf) => 
        {

            let model = gltf.scene;
            model.rotation.set(0, -0.5 ,0)
            this.robot.scene.add(model);

            this.createControls(model, gltf.animations);

        }, undefined, function (e) 
        {
            console.error(e);
        });

        this.robot.renderer = new THREE.WebGLRenderer(
            { 
                antialias: true,
                alpha: true
            });
        this.robot.renderer.setPixelRatio(window.devicePixelRatio);
        this.robot.renderer.setSize(this.container.nativeElement.clientWidth, this.container.nativeElement.clientHeight);
        this.robot.renderer.outputEncoding = THREE.sRGBEncoding;
        this.robot.renderer.setClearColor(0x000000, 0);
        this.container.nativeElement.appendChild(this.robot.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize);

        this.robot.controls = new FlyControls(this.robot.camera, this.robot.renderer.domElement);
    }

    private createControls(model, animations) 
    {
        this.robot.mixer = new THREE.AnimationMixer(model);

        this.robot.actions = {};

        for (let i = 0; i < animations.length; i ++) {

            const clip = animations[i];
            const action = this.robot.mixer.clipAction(clip);
            this.robot.actions[ clip.name ] = action;

            if (ROBOT_EMOTES.indexOf(clip.name) >= 0 || ROBOT_STATES.indexOf(clip.name) >= 4) 
            {
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            }
        }

        this.robot.activeAction = this.robot.actions[this.initialState ?? ROBOT_IDLE_STATE];
        this.robot.activeActionName = this.initialState ?? ROBOT_IDLE_STATE;
        this.robot.activeAction.play();
    }

    private onWindowResize() 
    {
        let ref = (window as any).robot;
        let container = document.getElementsByClassName('robotContainer')[0];
        ref.camera.aspect = container.clientWidth / container.clientHeight;
        ref.camera.updateProjectionMatrix();

        ref.renderer.setSize(container.clientWidth, container.clientHeight);
    }


}
