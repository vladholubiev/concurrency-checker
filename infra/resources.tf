module "us_east_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.us_east_1
  }
}

module "us_east_2" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.us_east_2
  }
}

module "us_west_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.us_west_1
  }
}

module "us_west_2" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.us_west_2
  }
}

module "af_south_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.af_south_1
  }
}

module "ap_east_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_east_1
  }
}

module "ap_southeast_3" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_southeast_3
  }
}

module "ap_southeast_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_southeast_1
  }
}

module "ap_southeast_2" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_southeast_2
  }
}

module "ap_south_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_south_1
  }
}

module "ap_northeast_3" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_northeast_3
  }
}

module "ap_northeast_2" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_northeast_2
  }
}

module "ap_northeast_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ap_northeast_1
  }
}

module "ca_central_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.ca_central_1
  }
}

module "eu_central_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_central_1
  }
}

module "eu_west_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_west_1
  }
}

module "eu_west_2" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_west_2
  }
}

module "eu_west_3" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_west_3
  }
}

module "eu_south_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_south_1
  }
}

module "eu_north_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.eu_north_1
  }
}

module "me_south_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.me_south_1
  }
}

module "sa_east_1" {
  source = "./modules/concurrency-checker"

  providers = {
    aws.primary = aws.sa_east_1
  }
}
