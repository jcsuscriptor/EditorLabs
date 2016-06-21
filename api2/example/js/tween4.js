robot = sprite('robot',0,300)
robot.scale.set(0.3)

animation = tween(robot).to({x:600},2000,"Bounce",true,0,-1,true)