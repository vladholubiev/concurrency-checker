terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region                 = "us-east-1"
  alias                  = "us_east_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "us-east-2"
  alias                  = "us_east_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "us-west-1"
  alias                  = "us_west_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "us-west-2"
  alias                  = "us_west_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "af-south-1"
  alias                  = "af_south_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-east-1"
  alias                  = "ap_east_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-south-2"
  alias                  = "ap_south_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-southeast-3"
  alias                  = "ap_southeast_3"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-southeast-4"
  alias                  = "ap_southeast_4"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-southeast-1"
  alias                  = "ap_southeast_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-southeast-2"
  alias                  = "ap_southeast_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-south-1"
  alias                  = "ap_south_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-northeast-3"
  alias                  = "ap_northeast_3"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-northeast-2"
  alias                  = "ap_northeast_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ap-northeast-1"
  alias                  = "ap_northeast_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "ca-central-1"
  alias                  = "ca_central_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-central-1"
  alias                  = "eu_central_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-west-1"
  alias                  = "eu_west_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-west-2"
  alias                  = "eu_west_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-west-3"
  alias                  = "eu_west_3"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-south-1"
  alias                  = "eu_south_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-north-1"
  alias                  = "eu_north_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-south-2"
  alias                  = "eu_south_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "eu-central-2"
  alias                  = "eu_central_2"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "me-south-1"
  alias                  = "me_south_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "me-central-1"
  alias                  = "me_central_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}

provider "aws" {
  region                 = "sa-east-1"
  alias                  = "sa_east_1"
  access_key             = var.access_key
  secret_key             = var.secret_key
  skip_region_validation = true
}
