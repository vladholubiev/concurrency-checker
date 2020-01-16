terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.2"
      configuration_aliases = [aws.primary]
    }
  }
  required_version = ">= 0.13"
}
