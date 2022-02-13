export class Lod
{
    public camera: any;
    public scene: any;
    public renderer: any; 
    public controls: any;
    public clock: any;
    public pointLight: any;
    public material: any;
    public theme: any;
    public currentStatus: string = '';

    public animate() 
    {
        let ref = (window as any).lod
        requestAnimationFrame(ref.animate);
        ref.render();
    }

    public render() 
    {
        let ref = (window as any).lod
        ref.controls.update(ref.clock.getDelta());

        ref.renderer.render(ref.scene, ref.camera);
    }
}