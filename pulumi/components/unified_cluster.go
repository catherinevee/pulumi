package main

import (
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
    "github.com/pulumi/pulumi-aws/sdk/v6/go/aws/eks"
    "github.com/pulumi/pulumi-azure-native/sdk/go/azure/containerservice"
    "github.com/pulumi/pulumi-gcp/sdk/v7/go/gcp/container"
)

type ClusterProvider string

const (
    AWS   ClusterProvider = "aws"
    Azure ClusterProvider = "azure"
    GCP   ClusterProvider = "gcp"
)

type UnifiedCluster struct {
    pulumi.ResourceState

    Endpoint   pulumi.StringOutput `pulumi:"endpoint"`
    Kubeconfig  pulumi.StringOutput `pulumi:"kubeconfig"`
}

type ClusterArgs struct {
    Name     string
    Provider ClusterProvider
    Region   string
}

func NewUnifiedCluster(ctx *pulumi.Context, name string, provider ClusterProvider, args *ClusterArgs, opts ...pulumi.ResourceOption) (*UnifiedCluster, error) {
    var cluster *UnifiedCluster

    switch provider {
    case AWS:
        eksCluster, err := eks.NewCluster(ctx, name, &eks.ClusterArgs{
            RoleArn: pulumi.String("arn:aws:iam::123456789012:role/eks-cluster-role"),
            VpcConfig: &eks.ClusterVpcConfigArgs{
                SubnetIds: pulumi.StringArray{
                    pulumi.String("subnet-12345678"),
                },
            },
        }, opts...)
        if err != nil {
            return nil, err
        }
        cluster = &UnifiedCluster{
            ResourceState: eksCluster.ResourceState,
            Endpoint:      eksCluster.Endpoint,
            Kubeconfig:    eksCluster.Kubeconfig,
        }

    case Azure:
        aksCluster, err := containerservice.NewManagedCluster(ctx, name, &containerservice.ManagedClusterArgs{
            ResourceGroupName: pulumi.String("myResourceGroup"),
            AgentPoolProfiles: containerservice.ManagedClusterAgentPoolProfileArray{
                &containerservice.ManagedClusterAgentPoolProfileArgs{
                    Name:    pulumi.String("agentpool"),
                    Count:   pulumi.Int(3),
                    VmSize:  pulumi.String("Standard_DS2_v2"),
                },
            },
        }, opts...)
        if err != nil {
            return nil, err
        }
        cluster = &UnifiedCluster{
            ResourceState: aksCluster.ResourceState,
            Endpoint:      aksCluster.Fqdn,
            Kubeconfig:    aksCluster.KubeConfig,
        }

    case GCP:
        gkeCluster, err := container.NewCluster(ctx, name, &container.ClusterArgs{
            Location: pulumi.String(args.Region),
            InitialNodeCount: pulumi.Int(3),
            NodeConfig: &container.ClusterNodeConfigArgs{
                MachineType: pulumi.String("n1-standard-1"),
            },
        }, opts...)
        if err != nil {
            return nil, err
        }
        cluster = &UnifiedCluster{
            ResourceState: gkeCluster.ResourceState,
            Endpoint:      gkeCluster.Endpoint,
            Kubeconfig:    gkeCluster.KubeConfig,
        }

    default:
        return nil, pulumi.Errorf("unsupported provider: %s", provider)
    }

    return cluster, nil
}