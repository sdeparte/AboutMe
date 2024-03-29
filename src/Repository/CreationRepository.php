<?php

namespace App\Repository;

use App\Entity\Creation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Creation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Creation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Creation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CreationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Creation::class);
    }

    public function findAll()
    {
        return $this->findBy(array(), ['date' => 'DESC']);
    }
}
