#!/bin/bash -x

# create the VM instance on Amazon EC2
function create_ec2_vm() {
 docker-machine create --driver amazonec2 --amazonec2-vpc-id $VPC_ID --amazonec2-region "$VPC_REGION" --amazonec2-zone "$VPC_ZONE" $INSTANCE_NAME
}

# set the ec2 instance to be used by docker
function set_docker_ec2_vm() {
 eval $(docker-machine env $INSTANCE_NAME);
}

## perform operations

# create the ec2 vm
create_ec2_vm

# select the instance to be used by docker
set_docker_ec2_vm