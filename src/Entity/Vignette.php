<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\VignetteRepository")
 */
class Vignette
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=2048)
     */
    private $url;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Creation", mappedBy="vignette", cascade={"persist", "remove"})
     */
    private $creation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    public function getCreation(): ?Creation
    {
        return $this->creation;
    }

    public function setCreation(Creation $creation): self
    {
        $this->creation = $creation;

        // set the owning side of the relation if necessary
        if ($this !== $creation->getVignette()) {
            $creation->setVignette($this);
        }

        return $this;
    }
}
