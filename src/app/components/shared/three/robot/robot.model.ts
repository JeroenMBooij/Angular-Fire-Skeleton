
export class Robot
{
    public camera;
    public scene;
    public renderer;
    public model;

    public api = { state: 'Walking' };
    public clock;
    public mixer;
    public actions;
    public activeAction;
    public activeActionName;
    public previousAction;
    public previousActionName;
    public controls;

    public animate() {

        let ref = (window as any).robot;
        const dt = ref.clock.getDelta();

        if (ref.mixer) ref.mixer.update(dt);

        (window as any).requestAnimationId = requestAnimationFrame(function() {
            ref.animate();
        });

        ref.renderer.render(ref.scene, ref.camera);

    }

    public fadeToAction(name: string, duration: number) 
    {
        let ref = (window as any).robot;

        ref.previousAction = ref.activeAction;
        ref.activeAction = ref.actions[name];

        if (ref.previousAction !== ref.activeAction) 
            ref.previousAction.fadeOut(duration);

        ref.activeActionName = name;
        ref.activeAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play();
    }

    public executeEmote(name: string)
    {
        let ref = (window as any).robot;

        ref.previousActionName = this.activeActionName;
        ref.fadeToAction(name, 0.2);

        ref.mixer.addEventListener('finished', ref.restoreState);
    }

    public restoreState() 
    {
        let ref = (window as any).robot;
        ref.fadeToAction(ref.previousActionName, 0.2);
    }
}