terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "aws" {
  region     = "us-east-1"
  alias      = "us_east_1"
  access_key = var.access_key
  secret_key = var.secret_key
}

provider "aws" {
  region     = "us-east-2"
  alias      = "us_east_2"
  access_key = var.access_key
  secret_key = var.secret_key
}

provider "aws" {
  region     = "us-west-1"
  alias      = "us_west_1"
  access_key = var.access_key
  secret_key = var.secret_key
}

provider "aws" {
  region     = "us-west-2"
  alias      = "us_west_2"
  access_key = var.access_key
  secret_key = var.secret_key
}

provider "aws" {
  region     = "af-south-1"
  alias      = "af_south_1"
  access_key = var.access_key
  secret_key = var.secret_key
}

provider "aws" {
  region     = "ap-east-1"
  alias      = "ap_east_1"
  access_key = var.access_key
  secret_key = var.secret_key
}
