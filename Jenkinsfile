node {

    stage('Chekcout') {
        checkout scm
    }
    
    stage('Containerize') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockercreds') {

                def customImage = docker.build(params.NestAppImageName)
                // Push the container to the custom Registry
                customImage.push()
        }
    }

    stage('Deploy') {
        echo "${StackAction}"
        
        if(params.stackAction=="update"){
            sh "aws cloudformation update-stack --stack-name neststack \
            --template-body file://cloudformation-ecs.yaml \
            --region 'ap-south-1' \
            --parameters  ParameterKey=PrivateDNSNamespaceName,ParameterValue=${PrivateDNSNamespaceName} ParameterKey=NestAppImageName,ParameterValue=${NestAppImageName} "
        }else if(params.stackAction=="create"){
            sh "aws cloudformation create-stack --stack-name neststack \
            --template-body file://cloudformation-ecs.yaml \
            --region 'ap-south-1' \
            --parameters  ParameterKey=PrivateDNSNamespaceName,ParameterValue=${PrivateDNSNamespaceName} ParameterKey=NestAppImageName,ParameterValue=${NestAppImageName} "
        }else{
            echo "No action on stack"
        }
        
        
    }
    
}
