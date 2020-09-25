<?php

namespace App\Repository;

use App\Entity\Vignette;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Vignette|null find($id, $lockMode = null, $lockVersion = null)
 * @method Vignette|null findOneBy(array $criteria, array $orderBy = null)
 * @method Vignette[]    findAll()
 * @method Vignette[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VignetteRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Vignette::class);
    }
}
